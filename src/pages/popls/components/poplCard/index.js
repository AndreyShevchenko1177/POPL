import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Checkbox, Button, TextField, Chip,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import editProfileIcon from "../../../../assets/edit_profile_card.png";
import { updatePopl } from "../../store/actions";
import { dateFormat } from "../../../../utils";
import Loader from "../../../../components/Loader";
import { cleanAction } from "../../../overallAnalytics/store/actions";

function PoplCard({
  popl, poplsCheck, customId, checkboxes, editMode, setEditMode, id, memberId, isFetching = {},
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [values, setValues] = useState({
    nickname: popl.nickname || popl.name,
    photo: popl.photo,
  });

  const changeIconSize = (event, size) => {
    event.currentTarget.style.transform = `scale(${size})`;
    event.currentTarget.style.transition = "transform 0.25s";
  };

  const changeMode = () => {
    setEditMode({ ...editMode, [customId]: !editMode[customId] });
  };

  const changeTextValue = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const updateTextValueByKey = (event, fetchedParam) => {
    if (values[event.target.name] === popl.nickname) return console.log("the same name");
    if (event.key === "Enter") {
      return dispatch(updatePopl(memberId, id, popl.photo, values.nickname, fetchedParam));
    }
  };

  const updateTextValue = (event, fetchedParam) => {
    if (values[event.target.name] === popl.nickname) return console.log("the same name");
    dispatch(updatePopl(memberId, id, popl.photo, values.nickname, fetchedParam));
  };

  const onPhotoAdded = (event) => {
    event.persist();
    return dispatch(updatePopl(memberId, id, event.target.files[0], values.nickname, "photo"));
  };

  return (
    <>
      <DragDots position="center" />
      <div className={classes.container}>
        <div
          className={classes.editPopl}
          onClick={changeMode}
          onMouseUp={(event) => changeIconSize(event, 1)}
          onMouseDown={(event) => changeIconSize(event, 0.7)}
        >
          <img
            style={{ width: 25, height: 25, cursor: "pointer" }}
            alt='edit'
            src={editProfileIcon}
          />
        </div>
        {editMode[customId] && <Chip
          className={classes.chipButton}
          onDelete={() => {
            dispatch(updatePopl(memberId, id, "", values.nickname, "photo"));
          }}
        />}
        {editMode[customId] && <div className={classes.linksEditWrapper} onClick={() => fileInputRef.current?.click()}>
          <EditIcon style={{ width: 15, height: 15 }}/>
        </div>}
        <input
          style={{ display: "none" }}
          ref={fileInputRef}
          type='file'
          multiple={false}
          onChange={onPhotoAdded}
        />
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ width: "40px", height: "40px" }}
          onClick={poplsCheck}
          name={`${customId}`}
          classes={{ root: "custom-checkbox-root" }}
          checked={checkboxes[customId]?.checked || false}
        />
        {isFetching[id]?.photo
          ? <Loader containerStyles={{ marginLeft: 50 }} styles={{ width: 20, height: 20 }} />
          : <img className={classes.avatar} alt="logo" src={popl.photo ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${popl.photo}?alt=media` : userIcon} />
        }
      </div>
      <div className={classes.contenContainer}>
        <div className={classes.cardTable}>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Profile Owner:</div>
            <div className={classes.tableCell}>{popl.profileOwner}</div>
          </div>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Nickname:</div>
            {!editMode[customId]
              ? <div onDoubleClick={() => setEditMode({ ...editMode, [customId]: !editMode[customId] })} className={classes.tableCell}>{popl.nickname || popl.name}</div>
              : isFetching[id]?.nickname
                ? <Loader containerStyles={{ marginLeft: 50 }} styles={{ width: 20, height: 20 }} />
                : <TextField
                  classes={{ root: classes.disabledTextfield }}
                  onChange={changeTextValue}
                  onBlur={(event) => updateTextValue(event, "nickname")}
                  onKeyDown={(event) => updateTextValueByKey(event, "nickname")}
                  disabled={!editMode[customId]}
                  onFocus={(event) => setValues((prev) => ({ ...prev, [event.target.name]: popl.nickname }))}
                  name='nickname'
                  placeholder={"Enter nickname"}
                  InputProps={{ disableUnderline: !editMode[customId], className: classes.nameInput }}
                  size='small'
                  value={values.nickname}
                /> }
          </div>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Activated:</div>
            <div className={classes.tableCell}>{dateFormat(popl.activationDate, "withTime")}</div>
          </div>
        </div>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={classes.button}
          onClick={() => {
            dispatch(cleanAction());
            history.push("/analytics", { name: popl.name, poplName: popl.name });
          }}
        >
          Analytics
        </Button>
        <div className={classes.popsCountNumber}>
          <span>
            { popl.popsNumber }
            <span style={{ marginLeft: 5 }}>Pops</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default PoplCard;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Checkbox, Button, TextField,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import editProfileIcon from "../../../../assets/edit_profile_card.png";
import { updatePopl } from "../../store/actions/requests";
import { dateFormat } from "../../../../utils";
import Loader from "../../../../components/Loader";
import { cleanAction } from "../../../overallAnalytics/store/actions";

function PoplCard({
  popl, poplsCheck, customId, checkboxes, editMode, setEditMode, id, memberId,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const [localPopl, setLocalPopl] = useState({});
  const [fetching, setFetching] = useState(false);

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

  const updateTextValue = (event) => {
    if (values[event.target.name] === localPopl.nickname) return console.log("the same name");
    setFetching(true);
    dispatch(updatePopl({
      [event.target.name]: values[event.target.name],
      iMemberID: memberId,
      iID: id,
      sAction: "UpdatePopl",
      ajax: 1,
    }, (error) => {
      if (error) return console.log(error);
      setFetching(false);
      setLocalPopl((prevValue) => ({ ...prevValue, nickname: values[event.target.name] }));
    }));
  };

  useEffect(() => {
    setLocalPopl(popl);
  }, []);

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
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ width: "40px", height: "40px" }}
          onClick={poplsCheck}
          name={`${customId}`}
          classes={{ root: "custom-checkbox-root" }}
          checked={checkboxes[customId]?.checked || false}
        />
        <img className={classes.avatar} alt="logo" src={userIcon} />
      </div>
      <div className={classes.contenContainer}>
        <div className={classes.cardTable}>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Profile Owner:</div>
            <div className={classes.tableCell}>{localPopl.profileOwner}</div>
          </div>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Nickname:</div>
            {!editMode[customId] ? <div onDoubleClick={() => setEditMode({ ...editMode, [customId]: !editMode[customId] })} className={classes.tableCell}>{localPopl.nickname}</div>

              : fetching ? <Loader containerStyles={{ marginLeft: 50 }} styles={{ width: 20, height: 20 }} />
                : <TextField
                  classes={{ root: classes.disabledTextfield }}
                  onChange={changeTextValue}
                  onBlur={updateTextValue}
                  disabled={!editMode[customId]}
                  onFocus={(event) => setValues((prev) => ({ ...prev, [event.target.name]: localPopl.nickname }))}
                  name='sNickName'
                  placeholder={"Enter nickname"}
                  InputProps={{ disableUnderline: !editMode[customId], className: classes.nameInput }}
                  size='small'
                  value={values.sNickName === undefined ? localPopl.nickname : values.sNickName}
                /> }
          </div>
          <div className={classes.tableRow}>
            <div className={classes.tableCell}>Activated:</div>
            <div className={classes.tableCell}>{dateFormat(localPopl.activationDate, "withTime")}</div>
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
            { localPopl.popsNumber }
            <span style={{ marginLeft: 5 }}>Pops</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default PoplCard;

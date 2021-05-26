import React, { useState, useRef } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import {
  TextField, Button, Typography, IconButton, Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import useStyles from "../styles/styles";
import Popup from "../../../../../components/popup";
import { snackBarAction } from "../../../../../store/actions";

function EditScreen({
  currentIcon,
  icon,
  id,
  title,
  value,
  hash,
  isDeleteTab,
  profileBtnTitle,
  allProfilesBtnTitle,
  profileBtnEvent,
  allProfileBtnEvent,
  deleteBtnTitle,
  deleteAction,
  deleteAllLinksAction,
  setLinkOrdering,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ title: null, value: null });
  const [isValid, setIsValid] = useState({ title: true, value: true });
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [src, setSrc] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleOpenPopup = () => setIsOpenPopup(!isOpenPopup);

  const onIconAdded = (event) => {
    event.persist();
    // Check if the file is an image.
    const file = event.target?.files[0];
    if (file?.type.indexOf("image") === -1) {
      return dispatch(snackBarAction({
        message: "Invalid file type",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    setFile(event.target?.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
      setSrc(evt.target.result);
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const popupConfig = [
    {
      id: 1,
      name: deleteBtnTitle,
      onClick: () => deleteAction(hash, inputValue.value || value, inputValue.title || title),
    },
    {
      id: 2,
      name: "Delete link from all profiles",
      onClick: () => deleteAllLinksAction(hash, id, title, value, inputValue.value || value, inputValue.title || title),
    },
  ];

  const handleSetLinkUrl = (event) => {
    event.persist();
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ justifyContent: isDeleteTab ? "center" : "space-between" }} className={classes.linkContainer}>
      <div style={isDeleteTab ? { height: "auto", paddingBottom: 60 } : {}} className={classes.linkImageValueContainer}>
        <div className={classes.secondPageLink}>
          <Popup
            config={popupConfig}
            isOpen={isOpenPopup}
            handleClose={handleOpenPopup}
            styles={classes.popup}
          />

          <IconButton
            className={classes.removeButton}
            onClick={() => setIsOpenPopup(!isOpenPopup)}
          >
            <RemoveIcon className={classes.removeIcon} />
          </IconButton>
          {!file
            ? <div className={classes.editIconWrapper} onClick={() => fileInputRef.current?.click()}>
              <EditIcon className={classes.editIcon}/>
            </div>
            : <Chip
              className={classes.chipButton}
              size='medium'
              onDelete={() => {
                setSrc("");
                setFile(null);
              }}
            />}
          <img className={classes.secondScreenLinkImage} src={src || (icon
            ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media`
            : currentIcon.icon)} alt={id} />
        </div>
        {!isDeleteTab && <div className={classes.linkInputsWrapper}>
          <div className={classes.labelContainer}>
            <Typography variant='h5'>Title</Typography>
          </div>
          <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
            <TextField
              fullWidth
              value={inputValue.title === "" ? inputValue.title : inputValue.title || title}
              name='title'
              placeholder='Link Title'
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
          <div className={classes.labelContainer}>
            <Typography variant='h5'>Url</Typography>
          </div>
          <div className={clsx(classes.linkValue, !isValid.value && classes.borderRed)}>

            <TextField
              fullWidth
              value={inputValue.value === "" ? inputValue.value : inputValue.value || value}
              name='value'
              placeholder={currentIcon.placeholder}
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
            {(!isValid.value || !isValid.title) && <span className={classes.errorText}>Mandatory field</span>}
          </div>
        </div>}
      </div>
      <div className={classes.btnContainer}>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ whiteSpace: "nowrap" }}
            className={classes.editLink}
            onClick={() => profileBtnEvent(hash, inputValue.value || value, inputValue.title || title, file)}
          >
            {profileBtnTitle}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.editLink}
            style={{ whiteSpace: "nowrap" }}
            onClick={() => allProfileBtnEvent(hash, id, title, value, inputValue.value || value, inputValue.title || title, file)}
          >
            {allProfilesBtnTitle}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.editLink}
            style={{ whiteSpace: "nowrap" }}
            onClick={() => setLinkOrdering(id)}
          >
            Make link first for all profiles
          </Button>
        </div>
      </div>
      <input
        style={{ display: "none" }}
        ref={fileInputRef}
        type='file'
        multiple={false}
        onChange={onIconAdded}
      />
    </div>
  );
}
export default EditScreen;

import React, { useState } from "react";
import clsx from "clsx";
import { TextField, Button, Typography } from "@material-ui/core";
import useStyles from "../styles/styles";

function EditScreen({
  currentIcon, icon, id, title, value, hash, isDeleteTab, profileBtnTitle, allProfilesBtnTitle, profileBtnEvent, allProfileBtnEvent,
}) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState({ title: "", value: "" });
  const [isValid, setIsValid] = useState({ title: true, value: true });

  const handleSetLinkUrl = (event) => {
    event.persist();
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ justifyContent: isDeleteTab ? "center" : "space-between" }} className={classes.linkContainer}>
      <div style={isDeleteTab ? { height: "auto", paddingBottom: 60 } : {}} className={classes.linkImageValueContainer}>
        <div className={classes.secondPageLink}>

          <img className={classes.secondScreenLinkImage} src={icon
            ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media`
            : currentIcon.icon} alt={id} />
        </div>
        {!isDeleteTab && <div className={classes.linkInputsWrapper}>
          <div className={classes.labelContainer}>
            <Typography variant='h5'>Title</Typography>
          </div>
          <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
            <TextField
              fullWidth
              value={inputValue.title || title}
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
              value={inputValue.value || value}
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
            onClick={() => profileBtnEvent(hash, inputValue.value || value, inputValue.title || title)}
          >
            {profileBtnTitle}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ whiteSpace: "nowrap" }}
            onClick={() => allProfileBtnEvent(hash, id, title, value, inputValue.value || value, inputValue.title || title)}
          >
            {allProfilesBtnTitle}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default EditScreen;

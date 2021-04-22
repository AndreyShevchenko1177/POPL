import React, { useState } from "react";
import clsx from "clsx";
import { TextField, Button, Typography } from "@material-ui/core";
import useStyles from "../styles/styles";

function EditScreen({
  icon, id, title, value, hash, isDeleteTab, profileBtnTitle, allProfilesBtnTitle, profileBtnEvent, allProfileBtnEvent,
}) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState({ title: "", value: "" });
  const [isValid, setIsValid] = useState({ title: true, value: true });

  const handleSetLinkUrl = (event) => {
    event.persist();
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  return (
    <div className={classes.linkContainer}>
      <div className={classes.linkImageValueContainer}>
        <div className={classes.secondPageLink}>
          <img className={classes.secondScreenLinkImage} src={icon.icon} alt={id} />
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
              placeholder={icon.placeholder}
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
            onClick={() => profileBtnEvent(hash)}
          >
            {profileBtnTitle}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={allProfileBtnEvent}
          >
            {allProfilesBtnTitle}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default EditScreen;

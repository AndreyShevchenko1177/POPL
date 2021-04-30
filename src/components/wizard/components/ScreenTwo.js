import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../styles/styles";
import { addLinkAction, clearStateAction } from "../../../pages/profiles/store/actions";

function ScreenTwo({
  icon, id, closeWizard, profileData, disabled,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const addLinkSuccess = useSelector(({ profilesReducer }) => profilesReducer.addLink.data);
  const [inputValue, setInputValue] = useState({ title: "", value: "" });
  const [isValid, setIsValid] = useState({ title: true, value: true });

  const handleSetLinkUrl = (event) => {
    event.persist();
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const addLink = () => {
    const validation = { value: true, title: true };
    if (!inputValue.value) validation.value = false;
    if (!inputValue.title) validation.title = false;
    setIsValid(validation);
    if (Object.values(validation).includes(false)) return;
    setIsValid({ title: true, value: true });
    dispatch(addLinkAction(inputValue.value, inputValue.title, profileData, id, userData.id));
  };

  useEffect(() => {
    if (addLinkSuccess === "success") closeWizard();
  }, [addLinkSuccess]);

  useEffect(() => () => {
    dispatch(clearStateAction("addLink"));
  }, []);

  return (
    <div className={classes.linkContainer}>
      <div className={classes.linkImageValueContainer}>
        <div className={clsx(classes.secondPageLink)}>
          <img className={classes.secondScreenLinkImage} src={icon.icon} alt={id} />
        </div>
        <div className={classes.linkInputsWrapper}>
          <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
            <TextField
              fullWidth
              value={inputValue.title}
              name='title'
              placeholder='Link Title'
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
          <div className={clsx(classes.linkValue, !isValid.value && classes.borderRed)}>
            <TextField
              fullWidth
              value={inputValue.value}
              name='value'
              placeholder={icon.placeholder}
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
            {(!isValid.value || !isValid.title) && <span className={classes.errorText}>Mandatory field</span>}
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addLink}
          disabled={disabled}
        >
          Add link
        </Button>
      </div>
    </div>
  );
}

export default ScreenTwo;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Chip, TextField } from "@material-ui/core";
import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "../styles/styles";
import { addLinkAction, clearStateAction } from "../../../pages/profiles/store/actions";
import { getId } from "../../../utils";

function ScreenTwo({
  icon, id, closeWizard, profileData, action,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const addLinkSuccess = useSelector(({ profilesReducer }) => profilesReducer.addLink.data);
  const [values, setValues] = useState({ title: "", value: "", file: { src: "", file: null } });
  const [isValid, setIsValid] = useState({ title: true, value: true });
  const fileInputRef = useRef(null);

  const handleSetLinkUrl = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onIconAdded = (event) => {
    event.persist();
    // Check if the file is an image.
    console.log(event.target?.files[0]);

    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
      const file = event.target.files[0];
      setValues((prev) => ({ ...prev, file: { file, src: evt.target.result } }));
    });
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = "";
  };

  console.log(values);

  const addLink = () => {
    const validation = { value: true, title: true };
    if (!values.value) validation.value = false;
    if (!values.title) validation.title = false;
    setIsValid(validation);
    if (Object.values(validation).includes(false)) return;
    setIsValid({ title: true, value: true });
    dispatch(addLinkAction(values.value, values.title, profileData, id, userData.id, values.file.file));
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
          <img className={values.file.src ? classes.secondScreenCustomImage : classes.secondScreenLinkImage} src={values.file.src || icon.icon} alt={id} />
          <div className={classes.editIconWrapper} onClick={() => fileInputRef.current?.click()}>
            <EditIcon className={classes.editIcon}/>
          </div>
          <Chip
            className={classes.chipButton}
            size='medium'
            onDelete={() => setValues({ ...values, file: { src: "", file: null } })}
          />
          <input
            style={{ display: "none" }}
            ref={fileInputRef}
            type='file'
            multiple={false}
            onChange={onIconAdded}
          />
        </div>
        <div className={classes.linkInputsWrapper}>
          <div className={clsx(classes.linkValue, "mb-10", !isValid.title && classes.borderRed)}>
            <TextField
              fullWidth
              value={values.title}
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
              value={values.value}
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
          onClick={action
            ? () => {
              action({ ...values, id, customId: getId(8) });
              closeWizard();
            }
            : addLink
          }
        >
          Add link
        </Button>
      </div>
    </div>
  );
}

export default ScreenTwo;

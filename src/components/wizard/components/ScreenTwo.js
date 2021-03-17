import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../styles/styles";
import { addLinkAction, clearStateAction } from "../../../pages/profiles/store/actions";

function ScreenTwo({
  icon, id, closeWizard,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const addLinkSuccess = useSelector(({ profilesReducer }) => profilesReducer.addLink.data);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleSetLinkUrl = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const addLink = () => {
    if (!value) return setIsValid(false);
    setIsValid(true);
    dispatch(addLinkAction(value, userData.id, id));
  };

  useEffect(() => {
    if (addLinkSuccess === "success") closeWizard();
  }, [addLinkSuccess]);

  useEffect(() => () => {
    dispatch(clearStateAction("addLink"));
  }, []);

  console.log(value, isValid);

  return (
    <div className={classes.linkContainer}>
      <div className={classes.linkImageValueContainer}>
        <div className={clsx(classes.link, classes.secondPageLink)}>
          <img className={classes.secondScreenLinkImage} src={icon} alt={id} />
        </div>
        <div className={classes.linkValueWrapper}>
          <div className={clsx(classes.linkValue, !isValid && classes.borderRed)}>
            <TextField
              fullWidth
              value={value}
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
            {!isValid && <span className={classes.errorText}>Mandatory field</span>}
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addLink}
        >
          Add link
        </Button>
      </div>
    </div>
  );
}

export default ScreenTwo;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../styles/styles";
import { addLinkAction, clearStateAction } from "../../../pages/profiles/store/actions";

function ScreenTwo({
  image, title, value, id, closeWizard,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const addLinkSuccess = useSelector(({ profilesReducer }) => profilesReducer.addLink.data);
  const [linkUrl, setLinkUrl] = useState("");

  const handleSetLinkUrl = (event) => {
    event.persist();
    setLinkUrl(event.target.value);
  };

  const addLink = () => {
    dispatch(addLinkAction(linkUrl, userData.id));
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
        <div className={clsx(classes.link, classes.secondPageLink)}>
          <img className={classes.secondScreenLinkImage} src={image} alt={title} />
        </div>
        <div className={classes.linkValueWrapper}>
          <div className={classes.linkValue}>
            <TextField
              fullWidth
              value={linkUrl}
              onChange={handleSetLinkUrl}
              InputProps={{
                disableUnderline: true,
              }}
            />
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

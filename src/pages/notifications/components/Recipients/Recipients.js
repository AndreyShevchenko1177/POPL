import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStyles from "../styles";
import ProfilesList from "./ProfilesPopUp";
import userIcon from "../../../../assets/svg/user.svg";

function Recipients({ setValues, recipients }) {
  const classes = useStyles();
  const ref = useRef();
  const [isShow, setIsShow] = useState(false);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  const handleDeleteRecipient = (id) => {
    setValues((prev) => ({ ...prev, recipients: prev.recipients.filter(({ customId }) => customId !== id) }));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isShow]);

  return (
    <div className={classes.recipientsRoot}>
      <div className={classes.selectRecipient}>
        <Button
          className={classes.selectRecipientBtn}
          variant="contained"
          color="primary"
          onClick={() => setIsShow(true)}
        >
          Select Recipients
        </Button>
      </div>
      <div className={classes.recipientsList}>
        <Typography>Recipients *</Typography>
        <div className={classes.recipientsContentWrapper}>
          {recipients.map(({ name, image, customId }) => (
            <div key={customId} className={classes.recipientItem}>
              <img alt='userIcon' className={classes.recipientItemImage} src={image ? `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + image}?alt=media` : userIcon} />
              <p className={classes.recipientItemName} > {name}</p>
              <div className={classes.recipientsDeleteIcon} onClick={() => handleDeleteRecipient(customId)} >
                <HighlightOffIcon />
              </div>
            </div>
          ))}
        </div>

      </div>
      {isShow && (
        <div ref={ref} tabIndex={1} onBlur={(event) => {
          if (event.currentTarget.contains(event.relatedTarget)) return;
          setIsShow(false);
        }}>
          <ProfilesList
            recipients={recipients}
            setIsShow={setIsShow}
            profiles={profiles}
            setRecepients={setValues}
          />
        </div>
      )}
    </div>
  );
}

export default Recipients;

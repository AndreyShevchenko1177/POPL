import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationModal from "../notifications/components/NotificationModal";
import PreviewEmail from "../notifications/components/PreviewEmail";
import useStyles from "./styles/styles";

function EmailNotifications() {
  const classes = useStyles();
  const location = useLocation();
  const emails = location.state || [];

  const [values, setValues] = useState({
    title: "",
    message: "",
    recipients: emails,
    sendAs: 2,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const userData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.rootFieldsWrapper}>
        <div className={classes.rootFields}>
          <div className={classes.fieldWrapper}>
            <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>{"Subject"}<span>*</span></Typography>
            <TextField
              placeholder={"Subject"}
              name="title"
              value={values.title}
              onChange={handleChange}
              fullWidth
              variant='outlined'
              size="small"
            />
          </div>
          <div className={classes.fieldWrapper}>
            <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>Message <span>*</span></Typography>
            <TextField
              placeholder='Message'
              name="message"
              value={values.message}
              onChange={handleChange}
              multiline
              rows={values.sendAs === 1 ? 4 : 8}
              fullWidth
              variant='outlined'
              size="small"
            />
          </div>
          <div className={classes.fieldWrapper}>
            <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>{emails.length > 1 ? "Emails" : "Email"}</Typography>
            <div className={classes.emailListContainer}>
              <div className={clsx(classes.emailRow, classes.emailHeader)}>
                <Typography variant='h5'>Account name</Typography>
                <Typography variant='h5'>Account email</Typography>
              </div>
              {emails.map(({ email, name, customId }) => (
                <div className={classes.emailRow} key={customId}>
                  <p variant='h6'>{name || "no name"}</p>
                  <p variant='h6'>{email}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.fieldWrapper}>
            <div className={classes.confirmBtnWrapper}>
              <Button
                className={classes.confirmBtn}
                variant='contained'
                color="primary"
                onClick={() => setIsShowModal(true)}
                disabled={!emails.length || !values.message || !values.title}
              >
                  Schedule/Send now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PreviewEmail message={values.message} title={values.title} userName={userData && userData[0]?.name?.split(" ")[0]} />
      {isShowModal && <>
        <div className={classes.opacityBackground} onClick={() => setIsShowModal(false)}></div>
        <div className={classes.wizardContainer} tabIndex={1}>
          <NotificationModal closeModal={closeModal} data={values}/>
        </div>
      </>}
    </div>
  );
}

export default EmailNotifications;

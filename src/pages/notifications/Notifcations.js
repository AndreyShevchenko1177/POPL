import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import Recipients from "./components/Recipients";
import useStyles from "./styles";
import NotificationModal from "./components/NotificationModal";
import Preview from "./components/Preview";
import PreviewEmail from "./components/PreviewEmail";

function Notifications() {
  const classes = useStyles();
  const defaultValues = {
    title: "",
    message: "",
    sendAs: 1, // for send as using two options - 1 and 2. 1 - Push notifications checked, 2 - email
    recipients: [],
  };
  const [values, setValues] = useState({
    title: "",
    message: "",
    sendAs: 1, // for send as using two options - 1 and 2. 1 - Push notifications checked, 2 - email
    recipients: [],
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const userData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  console.log(values);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const closeModal = () => {
    setValues({ ...defaultValues, sendAs: values.sendAs });
    setIsShowModal(false);
  };

  useEffect(() => {
    setValues({ ...defaultValues, sendAs: values.sendAs });
  }, [values.sendAs]);

  return (
    <>
      <Header
        rootLink="Notifications"
        path="/notifications"
      />
      <div className={classes.root}>
        <div className={classes.rootFieldsWrapper}>
          <div className={classes.rootFields}>
            <div className={classes.fieldWrapper}>
              <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>Send As</Typography>
              <div className={classes.sendAsBtnWrapper}>
                <Button
                  className={classes.sendAsBtn}
                  variant='contained'
                  color={values.sendAs === 1 ? "primary" : "secondary"}
                  onClick={() => setValues({ ...values, sendAs: 1 })}
                >
                  Push Notification
                </Button>
                <Button
                  className={classes.sendAsBtn}
                  variant='contained'
                  color={values.sendAs === 2 ? "primary" : "secondary"}
                  onClick={() => setValues({ ...values, sendAs: 2 })}
                >
                  Email
                </Button>
              </div>
            </div>
            <div className={classes.fieldWrapper}>
              <Typography variant='subtitle1' classes={{ subtitle1: classes.formLabels }}>{values.sendAs === 1 ? "Title " : "Subject "}<span>*</span></Typography>
              <TextField
                placeholder={values.sendAs === 1 ? "Title" : "Subject"}
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
              <Recipients recipients={values.recipients} setValues={setValues} />
            </div>
            <div className={classes.fieldWrapper}>
              <div className={classes.confirmBtnWrapper}>
                <Button
                  className={classes.confirmBtn}
                  variant='contained'
                  color="primary"
                  onClick={() => setIsShowModal(true)}
                  disabled={!values.recipients.length || !values.message || !values.title}
                >
                  Schedule/Send now
                </Button>
              </div>
            </div>
          </div>
        </div>
        {values.sendAs === 1
          ? <Preview message={values.message} title={values.title} />
          : <PreviewEmail message={values.message} title={values.title} userName={userData && userData[0]?.name?.split(" ")[0]} />
        }
      </div>
      {isShowModal && <>
        <div className={classes.opacityBackground} onClick={() => setIsShowModal(false)}></div>
        <div className={classes.wizardContainer} tabIndex={1}>
          <NotificationModal closeModal={closeModal} data={values}/>
        </div>
      </>}
    </>
  );
}

export default Notifications;

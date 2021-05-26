import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import Recipients from "./components/Recipients";
import TimeOfDelivery from "./components/TimeOfDelivery";
import useStyles from "./styles";

function Notifications() {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    message: "",
    sendAs: 1, // for send as using two options - 1 and 2. 1 - Push notifications checked, 2 - email
    recipients: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  console.log(values.recipients);

  return (
    <>
      <Header
        rootLink="Notifications"
        path="/notifications"
      />
      <div className={classes.root}>
        <div className={classes.fieldWrapper}>
          <Typography>Send As</Typography>
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
          <Typography>Title</Typography>
          <TextField
            placeholder='Title (Any/English)'
            name="title"
            value={values.title}
            onChange={handleChange}
            fullWidth
            variant='outlined'
            size="small"
          />
        </div>
        <div className={classes.fieldWrapper}>
          <Typography>Message <span>*</span></Typography>
          <TextField
            placeholder='Title (Any/English)'
            name="message"
            value={values.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            variant='outlined'
            size="small"
          />
        </div>
        <div className={classes.fieldWrapper}>
          <Recipients recipients={values.recipients} setValues={setValues} />
        </div>
        <div className={classes.fieldWrapper}>
          <TimeOfDelivery />
        </div>
        <div className={classes.fieldWrapper}>
          <div className={classes.confirmBtnWrapper}>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              // onClick={}
            >
              Preview
            </Button>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              // onClick={() => setValues({ ...values, sendAs: 2 })}
            >
              Schedule/Send now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;

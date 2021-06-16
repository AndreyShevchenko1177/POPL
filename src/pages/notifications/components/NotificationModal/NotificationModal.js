import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField, Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import SendIcon from "@material-ui/icons/Send";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import useStyles from "./styles/styles";
import Strategy from "./Strategy";
import getDayTime from "./getDayTime";
import { normalizeDate } from "../../../../utils";
import {
  sendNotificationAction, sendShedulerNotificationAction, sendEmailAction, sendShedulerEmailAction,
} from "../../store/actions";

function NotificationModal({ closeModal, data, clearFields }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState({ value: 1, isShedule: false });
  const [selectedDate, handleDateChange] = useState(new Date());
  const [time, setTime] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const sendNotification = () => {
    if (data.sendAs === 2) {
      data.message = `${data.message}<br/><br/>Sent via Popl Enterprise`;
      setIsButtonDisabled(true);
      return dispatch(sendEmailAction({ ...data, users: data.recipients }, closeModal));
    }
    setIsButtonDisabled(true);
    dispatch(sendNotificationAction({ ...data, users: data.recipients.map((el) => el.id) }, closeModal));
  };

  const sendNotificationByTime = () => {
    if (data.sendAs === 2) {
      data.message = `${data.message}<br/><br/>Sent via Popl Enterprise`;
      closeModal();
      setIsButtonDisabled(true);
      return dispatch(sendShedulerEmailAction({ ...data, users: data.recipients, time: Math.round((new Date(selectedDate).getTime() - new Date().getTime()) / 1000) }, closeModal));
    }
    setIsButtonDisabled(true);
    dispatch(sendShedulerNotificationAction({ ...data, users: data.recipients.map((el) => el.id), time: new Date(selectedDate) }, closeModal));
  };

  const getActiveStrategyItems = (index) => {
    switch (index) {
    case 0: {
      return (
        <div className={classes.timeContainer}>
          <p>Choose send time</p>
          <div className={classes.calendarContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MMM dd, yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onClick={() => setOpenCalendar(true)}
                open={openCalendar}
                onClose={() => setOpenCalendar(false)}
                onChange={(date) => {
                  handleDateChange(`${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} ${time ? normalizeDate(new Date(time).getHours()) : new Date().getHours()}:${time ? normalizeDate(new Date(time).getMinutes()) : new Date().getMinutes()}`);
                }}
                size='small'
                style={{ fontWeight: "normal" }}
                minDate={new Date()}
              />
            </MuiPickersUtilsProvider>
            <Autocomplete
              id="combo-box-demo"
              size='small'
              options={getDayTime(15)}
              getOptionDisabled={(option) => {
                const timeMilliseconds = new Date(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${option.value ? normalizeDate(new Date(option.value).getHours()) : new Date().getHours()}:${option.value ? normalizeDate(new Date(option.value).getMinutes()) : new Date().getMinutes()}`).getTime();
                const dateNowMilliseconds = new Date().getTime();
                if (dateNowMilliseconds > timeMilliseconds) return true;
                return false;
              }}
              getOptionSelected={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.title}
              style={{ display: "inline-flex" }}
              onChange={(event, value) => {
                if (!value) {
                  return setTime("");
                }
                setTime(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${new Date(value.value).getHours()}:${new Date(value.value).getMinutes()}`);
                handleDateChange(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${value.value ? normalizeDate(new Date(value.value).getHours()) : new Date().getHours()}:${value.value ? normalizeDate(new Date(value.value).getMinutes()) : new Date().getMinutes()}`);
              }}
              renderInput={(params) => <TextField {...params} label="Choose time" variant="outlined" />}
            />
          </div>
          <div className={classes.bottomButtons}>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              onClick={closeModal}
              disabled={isButtonDisabled}
            >
              Cancel
            </Button>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              onClick={sendNotificationByTime}
              disabled={isButtonDisabled}
            >
              Schedule
            </Button>
          </div>
        </div>
      );
    }
    case 1: {
      return (
        <div className={clsx(classes.bottomButtons, classes.absoluteBtn)}>
          <Button
            className={classes.confirmBtn}
            variant='contained'
            color="primary"
            onClick={closeModal}
            disabled={isButtonDisabled}
          >
            Cancel
          </Button>
          <Button
            className={classes.confirmBtn}
            variant='contained'
            color="primary"
            onClick={sendNotification}
            disabled={isButtonDisabled}
          >
            Send now
          </Button>
        </div>
      );
    }
    default: return <div>...</div>;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.headerContainer}>
          <Typography variant='body1'>Ready to Send?</Typography>
          <div className='c-pointer' onClick={closeModal}>
            <CloseIcon />
          </div>
        </div>
        <div className={classes.strategyContainer}>
          <Typography variant='h5'>Sending Strategy</Typography>
          <div className={classes.strategy}>
            <Strategy
              title='Schedule'
              icon={<QueryBuilderIcon/>}
              description='Choose a future date and time to send'
              activeTab={activeTab.isShedule}
              onClick={(name) => setActiveTab({ value: 0, isShedule: true })}
            />
            <Strategy
              title='Send Now'
              icon={<SendIcon/>}
              description='Send your message immediately'
              activeTab={!activeTab.isShedule}
              onClick={(name) => setActiveTab({ value: 1, isShedule: false })}
            />
          </div>
        </div>
        <div className={classes.strategyItems}>
          {getActiveStrategyItems(activeTab.value)}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;

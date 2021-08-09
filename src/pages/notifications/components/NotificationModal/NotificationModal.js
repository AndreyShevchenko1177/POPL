import React, { useCallback, useState } from "react";
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
  sendNotificationAction, sendShedulerNotificationAction, sendEmailAction, sendShedulerEmailAction, addAttachementAction, addAttachementShedulerAction,
} from "../../store/actions";
import TimeSheduler from "../../../../components/TimeSheduler";

function NotificationModal({
  closeModal, data, file, isConnection,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState({ value: 1, isShedule: false });
  const [selectedDate, handleDateChange] = useState(new Date());
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const selectDay = useCallback((date) => {
    handleDateChange(date);
  }, []);

  const sendNotification = () => {
    if (data.sendAs === 2) {
      const reqData = { ...data };
      reqData.message = `${reqData.message}<br/><br/>Sent via Popl Enterprise`;
      setIsButtonDisabled(true);
      if (file) {
        return dispatch(addAttachementAction(file, { ...reqData, users: data.recipients }, closeModal, isConnection));
      }
      return dispatch(sendEmailAction({ ...reqData, users: data.recipients }, closeModal, isConnection));
    }
    setIsButtonDisabled(true);
    dispatch(sendNotificationAction({ ...data, users: data.recipients.map((el) => el.id) }, closeModal));
  };

  const sendNotificationByTime = () => {
    if (data.sendAs === 2) {
      const reqData = { ...data };
      reqData.message = `${reqData.message}<br/><br/>Sent via Popl Enterprise`;
      closeModal();
      setIsButtonDisabled(true);
      if (file) {
        return dispatch(addAttachementShedulerAction(file, { ...reqData, users: reqData.recipients, time: Math.round((new Date(selectedDate).getTime() - new Date().getTime()) / 1000) }, closeModal, isConnection));
      }
      return dispatch(sendShedulerEmailAction({ ...reqData, users: reqData.recipients, time: Math.round((new Date(selectedDate).getTime() - new Date().getTime()) / 1000) }, closeModal, isConnection));
    }
    console.log(new Date(selectedDate));
    setIsButtonDisabled(true);
    // dispatch(sendShedulerNotificationAction({ ...data, users: data.recipients.map((el) => el.id), time: new Date(selectedDate) }, closeModal));
  };

  const getActiveStrategyItems = (index) => {
    switch (index) {
    case 0: {
      return (
        <div className={classes.timeContainer}>
          <p>Choose send time</p>
          <TimeSheduler
            classes={classes}
            handleDateChange={selectDay}
            selectedDate={selectedDate}
          />
          <div className={classes.bottomButtons}>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              onClick={() => closeModal("cancel")}
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

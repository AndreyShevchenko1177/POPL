import React, { useState } from "react";
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

function NotificationModal({ closeModal }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState({ value: 1, isShedule: false });
  const [selectedDate, handleDateChange] = useState(new Date());
  const [time, setTime] = useState("");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const getActiveStrategyItems = (index) => {
    switch (index) {
    case 0: {
      return (
        <div className={classes.timeContainer}>
          <p>Choose send time</p>
          {/* {console.log(new Date(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`))} */}
          <div className={classes.calendarContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MMM dd, yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => {
                  handleDateChange(`${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} ${time ? normalizeDate(new Date(time).getHours()) : new Date().getHours()}:${time ? normalizeDate(new Date(time).getMinutes()) : new Date().getMinutes()}`);
                }}
                size='small'
                style={{ fontWeight: "normal" }}
              />
            </MuiPickersUtilsProvider>
            <Autocomplete
              id="combo-box-demo"
              size='small'
              options={getDayTime(15)}
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
              renderInput={(params) => <TextField {...params} label="Choose time or strategy" variant="outlined" />}
            />
          </div>
          <div className={classes.bottomButtons}>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className={classes.confirmBtn}
              variant='contained'
              color="primary"
              // onClick={}
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
          >
            Cancel
          </Button>
          <Button
            className={classes.confirmBtn}
            variant='contained'
            color="primary"
            // onClick={}
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
              onClick={(name) => setActiveTab({ value: 0, isShedule: !activeTab.isShedule })}
            />
            <Strategy
              title='Send Now'
              icon={<SendIcon/>}
              description='Start sending ypur campaign immediately'
              activeTab={!activeTab.isShedule}
              onClick={(name) => setActiveTab({ value: 1, isShedule: !activeTab.isShedule })}
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

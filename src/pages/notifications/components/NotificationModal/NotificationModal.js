import React, { useState } from "react";
import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import SendIcon from "@material-ui/icons/Send";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useStyles from "./styles/styles";
import Strategy from "./Strategy";

function NotificationModal() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState({ value: 0, isShedule: true });
  const [selectedDate, handleDateChange] = useState(new Date());
  const [time, setTime] = useState("");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const getActiveStrategyItems = (index) => {
    switch (index) {
    case 0: {
      return (
        <div>
          <p style={{ fontSize: "15px", fontWeight: "700", paddingBottom: 5 }}>Choose send time</p>
          {console.log(new Date(`${new Date(selectedDate).getMonth() + 1}-${new Date(selectedDate).getDate()}-${new Date(selectedDate).getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`))}
          <div className={classes.calendarContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MMM dd, yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateChange(date)}
                size='small'
              />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined" className={classes.formControl} size='small'>
              <InputLabel id="demo-simple-select-outlined-label">Choose time or strategy</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={time}
                onChange={handleChange}
                label="Choose time or strategy"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    }
    case 1: {
      return (
        <div>
          <p style={{ fontSize: "15px", fontWeight: "700" }}>Send Now</p>
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
          <CloseIcon/>
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

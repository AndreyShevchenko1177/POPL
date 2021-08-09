import Autocomplete from "@material-ui/lab/Autocomplete";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { memo, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, TextField } from "@material-ui/core";
import { getDayTime, normalizeDate } from "../utils";

const defaultStyles = makeStyles(() => ({
  calendarContainer: {
    display: "flex",
    "& > div:first-child": {
      width: "25%",
      minWidth: 180,
      marginRight: 5,
    },
    "& > div:last-child": {
      width: "calc(75% - 5px)",
      maxWidth: 460,
    },
    "& > div > div": {
      width: "100%",
      paddingLeft: 0,
    },
  },
}));

function TimeSheduler({ styles = defaultStyles(), selectedDate, handleDateChange }) {
  const [time, setTime] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <div className={styles.calendarContainer}>
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
  );
}

export default memo(TimeSheduler);

import { makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import { getDayTime, normalizeDate } from "../../../../utils";
import { dateTransform } from "../../helper";

const styles = makeStyles(() => ({
  inputRoot: {
    paddingRight: "0px !important",
    "& fieldset": {
      border: 0,
    },
  },
  popper: {
    width: "200px !important",
  },
}));

function ShedulerDay({
  selectedDate, setTimeHandler = () => {}, handleDateChange = () => {}, name, fromTime, isAllDay,
}) {
  const [time, setTime] = useState();
  const classes = styles();
  useEffect(() => setTime(getDayTime(15).find((el) => (el.value.getMinutes() === 30) && el.value.getHours() === selectedDate.getHours())?.title), []);

  useEffect(() => {
    if (time) {
      setTime(getDayTime(15).find((el) => (el.value.getMinutes() === selectedDate.getMinutes()) && el.value.getHours() === (selectedDate.getHours()))?.title);
    }
  }, [selectedDate]);

  return (
    <Autocomplete
      id={name}
      size='small'
      freeSolo
      disableClearable
      options={getDayTime(15)}
      disabled={isAllDay}
      getOptionDisabled={(option) => {
        const timeMilliseconds = new Date(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${option.value ? normalizeDate(new Date(option.value).getHours()) : new Date().getHours()}:${option.value ? normalizeDate(new Date(option.value).getMinutes()) : new Date().getMinutes()}`).getTime();
        const dateNowMilliseconds = new Date().getTime();
        let correctDate = null;
        if (fromTime) {
          if (fromTime.getMinutes() % 15 !== 0) {
            correctDate = getDayTime(15).find((el) => (el.value.getMinutes() === 30) && el.value.getHours() === (fromTime.getHours())).value;
          } else {
            correctDate = fromTime;
          }
        }

        if (name === "to" && dateTransform(fromTime || selectedDate, correctDate || selectedDate).getTime() > timeMilliseconds) return true;
        if (dateNowMilliseconds > timeMilliseconds) return true;
        return false;
      }}
      fullWidth
      closeIcon={<p></p>}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => {
        if (!option.title) return option;
        let correctDate; let correctSelectDate; let correctOptionDate; let
          diffHours = null;
        if (fromTime) {
          if (fromTime.getMinutes() % 15 !== 0) {
            correctDate = getDayTime(15).find((el) => (el.value.getMinutes() === 30) && el.value.getHours() === (fromTime.getHours())).value;
          } else {
            correctDate = fromTime;
          }

          correctSelectDate = dateTransform(fromTime, correctDate);
          correctOptionDate = dateTransform(fromTime, option.value);
          diffHours = moment(correctOptionDate).diff(moment(correctSelectDate), "minutes");

          return `${option.title} ${diffHours >= 0 ? ` (${diffHours / 60 < 1 ? `${diffHours} min.` : `${diffHours / 60} h.`})` : ""}`;
        }
        return option.title;
      }}
      style={{ display: "inline-flex" }}
      value={isAllDay ? (name === "from" ? "12:00 am" : "11:59 pm") : (time || "1:00 am")}
      onChange={(event, value) => {
        if (!value) {
          handleDateChange("", name);
          return setTimeHandler("");
        }
        setTimeHandler(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${new Date(value.value).getHours()}:${new Date(value.value).getMinutes()}`);
        handleDateChange(`${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()}/${new Date(selectedDate).getFullYear()} ${value.value ? normalizeDate(new Date(value.value).getHours()) : new Date().getHours()}:${value.value ? normalizeDate(new Date(value.value).getMinutes()) : new Date().getMinutes()}`, name);
      }}
      renderInput={(params) => <TextField {...params} variant='outlined' />}

      classes={{ inputRoot: classes.inputRoot, popper: classes.popper }}
    />
  );
}

export default memo(ShedulerDay);

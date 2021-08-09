import React, { memo, useCallback, useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core";
import { normalizeDate } from "../../../../utils";

const defaultStyles = makeStyles(() => ({
  calendarContainer: {
    display: "flex",
    "& > div:first-child": {
      width: "25%",
      minWidth: 125,
      marginRight: 5,
    },
    "& > div:last-child": {
      width: "calc(75% - 5px)",
      maxWidth: 460,
    },
    "& > div > div": {
      width: "100%",
      paddingLeft: 0,
      "& input": {
        width: "100px !important",
      },
    },
    "& > div > div fieldset": {
      border: 0,
      width: "65px !important",
    },
    "& > div > div > div button": {
      display: "none",
    },
  },
}));

function ShedulerCalendar({
  styles = defaultStyles(), selectedDate, handleDateChange, time, name,
}) {
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
            handleDateChange(`${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} ${time ? normalizeDate(new Date(time).getHours()) : new Date().getHours()}:${time ? normalizeDate(new Date(time).getMinutes()) : new Date().getMinutes()}`, name);
          }}
          size='small'
          style={{ fontWeight: "normal" }}
        //   minDate={new Date()}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default memo(ShedulerCalendar);

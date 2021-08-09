import { useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import moment from "moment";
import useStyles from "../styles";

function RepeatSelect({ value, setValue, date }) {
  const classes = useStyles();
  let countersOfWeeks = ["", "first", "second", "third", "fourth"];
  let weekCount = Math.ceil((moment(date, "MM-DD-YYYY").date() / 7));
  let selectedDay = moment(date, "MM-DD-YYYY").format("dddd");
  let month = moment(date, "MM-DD-YYYY").format("MM");
  let monthOfWeekLater = moment(date, "MM-DD-YYYY").add(7, "days").format("MM");
  let items = [
    "Repeat",
    `Weekly on ${selectedDay}`,
  ];
  if (month === monthOfWeekLater) {
    items.push(`Monthly on the ${countersOfWeeks[weekCount]} ${selectedDay}`);
  } else {
    items.push(`Monthly on the last ${selectedDay}`);
  }

  items = [...items,
    "Every weekday (Monday to Friday)",
    "Do not repeat",
  ];

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div className={classes.repeatSelectWrapper}>
      <Select
        value={value}
        onChange={handleChange}
        className={classes.selectEmpty}
        disableUnderline
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default RepeatSelect;

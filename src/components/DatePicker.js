import React, { Fragment, useState } from "react";
import Calendar from "react-range-calendar";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { getYear, getMonth, getDay } from "../utils/dates";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CDatePicker(props) {
  const currentDate1 = `${months[getMonth(new Date())]} ${getDay(
    new Date()
  )}, ${getYear(new Date())}-`;
  const currentDate2 = `${months[getMonth(new Date())]} ${getDay(
    new Date()
  )}, ${getYear(new Date())}`;
  const [state, setState] = useState({
    visible: false,
    dateRange: [new Date(), new Date()],
    normalData: [currentDate1, currentDate2],
  });

  return (
    <Fragment>
      <div
        className="datepicker"
        onClick={() => setState({ ...state, visible: !state.visible })}
      >
        <EventNoteIcon fontSize="small" />
        {state.normalData.map((el, key) => (
          <span key={key}>{el}</span>
        ))}
        <ArrowDropDownIcon fontSize="small" />
      </div>
      <div style={{ position: "absolute", right: "0px" }}>
        <Calendar
          visible={state.visible}
          dateRange={state.dateRange}
          type="free-range"
          onDateClick={(minDate, maxDate) => {
            const minD = `${months[getMonth(minDate)]} ${getDay(
              minDate
            )}, ${getYear(minDate)}-`;
            const maxD = `${months[getMonth(maxDate)]} ${getDay(
              maxDate
            )}, ${getYear(maxDate)}`;
            setState({
              ...state,
              dateRange: [minDate, maxDate],
              normalData: [minD, maxD],
              visible: false,
            });
          }}
        />
      </div>
    </Fragment>
  );
}

export default CDatePicker;

import React, { Fragment, useState, useRef, useEffect } from "react";
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
  const ref = useRef();

  const blurhandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return; // чтобы событие onlur не сработало на родители, при взаимодействии с дочерними элементами
    setState({ ...state, visible: false }); // убираем элемент с поля видимости
  };

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [state.visible]);

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
      {state.visible && (
        <div
          style={{ position: "absolute", right: "0px", outline: "none" }}
          ref={ref}
          onBlur={blurhandler}
          tabIndex={1}
        >
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
      )}
    </Fragment>
  );
}

export default CDatePicker;

import React, {
  Fragment, useRef, useEffect,
} from "react";
import {
  FormControl, InputLabel, Select, MenuItem,
} from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Calendar from "./calendar";

const selectConfig = [
  {
    id: 1,
    label: "last 7 days",
    value: "lastSevenDays",
  },
  {
    id: 2,
    label: "month to date",
    value: "monthToDate",
  },
  {
    id: 3,
    label: "last month",
    value: "lastMonth",
  },
  {
    id: 4,
    label: "week to date",
    value: "weekToDate",
  },
];

function MSelect({ onClick, options }) {
  return (
    <FormControl variant="outlined" fullWidth style={{ backgroundColor: "#fff", zIndex: 10 }}>
      <InputLabel id="demo-simple-select-outlined-label">Choose option</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="MSelect"
        value={options}
        onChange={onClick}
        label="Choose option"
      >
        <MenuItem value="" id='DefaultMOption'>
          <em>None</em>
        </MenuItem>
        {selectConfig.map((item, key) => <MenuItem id='MOption' key={key} value={item.label}>{item.label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

function CDatePicker({
  calendar, setCalendar, setDate, selectOption, options,
}) {
  const ref = useRef();

  const blurhandler = (event) => {
    if (event.currentTarget?.contains(event.relatedTarget) || event.relatedTarget?.id === "MSelect" || event.relatedTarget?.id === "MOption" || event.relatedTarget?.id === "DefaultMOption") return; // чтобы событие onlur не сработало на родители, при взаимодействии с дочерними элементами
    setCalendar({ ...calendar, visible: false }); // убираем элемент с поля видимости
  };

  const clickCalendar = () => {
    setCalendar({ ...calendar, visible: !calendar.visible });
  };

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [calendar.visible]);

  return (
    <Fragment>
      <div
        className="datepicker"
        onClick={clickCalendar}
      >
        <EventNoteIcon fontSize="small" />
        {calendar.normalData.map((el, key) => (
          <span key={key}>{el}</span>
        ))}
        <ArrowDropDownIcon fontSize="small" />
      </div>
      {calendar.visible && (
        <div
          style={{ position: "absolute", right: "0px", outline: "none" }}
          ref={ref}
          onBlur={blurhandler}
          tabIndex={1}
        >
          <MSelect onClick={selectOption} options={options}/>
          <Calendar
            visible={calendar.visible}
            dateRange={calendar.dateRange}
            type="free-range"
            onDateClick={setDate}
            maxDate={new Date().getTime()}
          />
        </div>
      )}
    </Fragment>
  );
}

export default CDatePicker;

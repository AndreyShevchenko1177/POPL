import React, {
  Fragment, useRef, useEffect,
} from "react";
import Calendar from "react-range-calendar";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function CDatePicker({ calendar, setCalendar, setDate }) {
  const ref = useRef();

  const blurhandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return; // чтобы событие onlur не сработало на родители, при взаимодействии с дочерними элементами
    setCalendar({ ...calendar, visible: false }); // убираем элемент с поля видимости
  };

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [calendar.visible]);

  return (
    <Fragment>
      <div
        className="datepicker"
        onClick={() => setCalendar({ ...calendar, visible: !calendar.visible })}
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
          <Calendar
            visible={calendar.visible}
            dateRange={calendar.dateRange}
            type="free-range"
            onDateClick={setDate}
          />
        </div>
      )}
    </Fragment>
  );
}

export default CDatePicker;

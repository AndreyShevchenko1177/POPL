import React, { memo, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { object } from "prop-types";
import Day from "./MonthDay";
import useStyles from "../../styles/styles.js";
import CalendarPopup from "../popup/calendarPopup";

function MonthViewLayout({
  data, modal, onModalHandler,
}) {
  const [calendarStore, setCalendarStore] = useState({});

  const setEvent = function ({ date, event }) {
    setCalendarStore((prev) => {
      const deleteThisEvent = (eventId, newDate) => () => {
        console.log("DELETE - ", eventId, newDate);
        if (prev[newDate] && prev[newDate].length > 0) prev[newDate] = prev[newDate].filter((event) => event.eventId !== eventId);
      };

      date = moment(date, "MM-DD-YYYY").format("YYYY/MM/DD");

      if (event.eventId && prev[date]) { // replace event
        prev[date] = [...prev[date].filter((el) => el.eventId !== event.eventId)];
      }

      // add new event

      let newDate = moment(event.selectedDate.from.calendar, "MM/DD/YYYY ").format("YYYY/MM/DD");
      let eventId = event?.eventId || moment().format("YYYY/MM/DD_HH:mm:ss.SSS");

      if (prev[newDate]) { // this date is present already
        prev[newDate].push({ ...event, eventId, deleteThisEvent: deleteThisEvent(eventId, newDate) });
        let newEvents = prev[newDate].sort((a, b) => {
          if (a.values.isAllDay) return -1;
          if (b.values.isAllDay) return 1;
          let timeA = moment(a.selectedDate.from.dayTime);
          let timeB = moment(b.selectedDate.from.dayTime);
          return timeA < timeB ? -1 : 1;
        });
        prev[newDate] = [...newEvents];
      } else { // this date was empty
        prev[newDate] = [{ ...event, eventId, deleteThisEvent: deleteThisEvent(eventId, newDate) }];
      }

      return prev;
    });
  };

  const addEventHandler = function (data) {
    setEvent({ date: data.currentDate, event: data });
  };

  const size = data.length === 35 ? { vh: 17, px: 0 } : { vh: 14, px: 1.5 };
  const classes = useStyles(size);
  return (
    <>
      <div className={classes.calendarWrapper}>
        <div className={clsx(classes.daysContainer, "f-width")}>
          <div className={classes.daysWrapper}>
            {data.map((data, index) => {
              let dayStore = calendarStore[moment(data.date, "MM-DD-YYYY").format("YYYY/MM/DD")];
              return <Day
                dayStore={dayStore}
                onModalHandler={onModalHandler}
                weekPosition={index}
                key={index} {...data} />;
            })}
          </div>
        </div>
      </div>
      {modal.isShow && <CalendarPopup data={modal.data} addEventHandler={addEventHandler} closeModal={(event) => {
        onModalHandler(modal.data, false);
      }} date={modal.data} />}
    </>
  );
}
export default memo(MonthViewLayout);

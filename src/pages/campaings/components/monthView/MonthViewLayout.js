import React, { memo, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import Day from "./MonthDay";
import useStyles from "../../styles/styles.js";
import CalendarPopup from "../popup/calendarPopup";
import EventPopup from "../popup/EventPopup";
import EventList from "./EventList";

function MonthViewLayout({
  data, modal, onModalHandler, modalEvent, onModalEventHandler, calendarSwitchStatus,
}) {
  const [calendarStore, setCalendarStore] = useState({});
  const [calendarStoreForList, setCalendarStoreForList] = useState({});

  const deleteAllEventsById = (eventId) => {
    console.log("DELETE event, ID: ", eventId);
    setCalendarStore((prev) => {
      for (let [key, day] of Object.entries(prev)) {
        prev[key] = day.filter((event) => event.eventId !== eventId);
      }
      setCalendarStoreForList({ ...prev });
      return { ...prev };
    });
  };

  const CheckRepeat = function ({ date, event }) { // date mast be in format  "MM-DD-YYYY"
    deleteAllEventsById(event?.eventId);

    // console.group('CheckRepeat - ### - ');
    // console.log('repeatOption', event?.values?.repeatOption);
    // console.log(date);
    // console.log(event);
    // console.groupEnd();
    let startDateUnix = moment(date, "MM-DD-YYYY");
    let endDateUnix = moment(startDateUnix).endOf("year");
    let currentDate; let calendarFrom; let calendarTo; let dayTimeFrom; let dayTimeTo; let selectedDate; let values; let
      step;

    let dateUnix = moment(startDateUnix);
    calendarFrom = moment(event.selectedDate.from.calendar).format("MM/DD/YYYY HH:mm");
    calendarTo = moment(event.selectedDate.to.calendar).format("MM/DD/YYYY HH:mm");
    dayTimeFrom = new Date(moment(event.selectedDate.from.dayTime));
    dayTimeTo = new Date(moment(event.selectedDate.to.dayTime));

    while (dateUnix < endDateUnix) {
      currentDate = moment(dateUnix).format("MM-DD-YYYY");
      date = moment(dateUnix).format("MM-DD-YYYY");
      // console.log(date);
      values = { ...event.values, eventDate: currentDate };

      selectedDate = {
        from: {
          calendar: calendarFrom,
          dayTime: dayTimeFrom,
        },
        to: {
          calendar: calendarTo,
          dayTime: dayTimeTo,
        },
      };

      setEvent({
        date,
        event: {
          ...event, currentDate, selectedDate, values,
        },
        doCheckRepeat: false,
      });

      if (event?.values?.repeatOption.indexOf("Weekly") > (-1)) { step = [7, "days"]; }
      if (event?.values?.repeatOption === "Repeat") { step = [1, "days"]; }
      step = step || [1, "years"];

      calendarFrom = moment(calendarFrom).add(...step).format("MM/DD/YYYY HH:mm");
      calendarTo = moment(calendarTo).add(...step).format("MM/DD/YYYY HH:mm");
      dayTimeFrom = new Date(moment(dayTimeFrom).add(...step));
      dayTimeTo = new Date(moment(dayTimeTo).add(...step));
      dateUnix = moment(dateUnix).add(...step);
    }
  };

  const setEvent = function ({ date, event, doCheckRepeat = true }) { // date mast be in format "MM-DD-YYYY"
    if (date === "DELETE_EVENT_BY_ID") {
      deleteAllEventsById(event?.eventId);
    } else {
      setCalendarStore((prev) => {
        let dateForStore = moment(date, "MM-DD-YYYY").format("YYYY/MM/DD");

        let eventId = event?.eventId || moment().format("YYYY/MM/DD_HH:mm:ss.SSS");
        event = { ...event, eventId };

        if (event.eventId && prev[dateForStore]) { // replace event from this dateForStore
          prev[dateForStore] = [...prev[dateForStore].filter((el) => el.eventId !== event.eventId)];
        }

        // add new event

        let newDate = moment(event.selectedDate.from.calendar, "MM/DD/YYYY ").format("YYYY/MM/DD");

        if (prev[newDate]) { // this date is present already
          prev[newDate].push(event);
          let newEvents = prev[newDate].sort((a, b) => {
            if (a.values.isAllDay) return -1;
            if (b.values.isAllDay) return 1;
            let timeA = moment(a.selectedDate.from.dayTime);
            let timeB = moment(b.selectedDate.from.dayTime);
            return timeA < timeB ? -1 : 1;
          });
          prev[newDate] = [...newEvents];
        } else { // this date was empty
          prev[newDate] = [event];
        }
        setCalendarStoreForList({ ...prev });
        // if (doCheckRepeat && (event?.values?.repeatOption !== "Do not repeat")) {CheckRepeat({date, event});}
        return prev;
      });
    }
  };

  const addEventHandler = function (data) {
    setEvent({ date: data.currentDate, event: data });
  };

  const size = data.length === 35 ? { vh: 17, px: 0 } : { vh: 14, px: 1.5 };
  const classes = useStyles(size);
  return (
    <>
      {calendarSwitchStatus
        && <div className={classes.calendarWrapper}>
          <div className={clsx(classes.daysContainer, "f-width")}>
            <div className={classes.daysWrapper}>

              {data.map((data, index) => {
                let dayStore = calendarStore[moment(data.date, "MM-DD-YYYY").format("YYYY/MM/DD")];
                return <Day
                  dayStore={dayStore}
                  onModalHandler={onModalHandler}
                  onModalEventHandler={onModalEventHandler}
                  weekPosition={index}
                  key={index} {...data} />;
              })}

            </div>
          </div>
        </div>
      }

      {!calendarSwitchStatus
        && <div className={classes.wrapperEventList}>
          <EventList
            calendarStore={calendarStoreForList}
            onModalHandler={onModalHandler}
            addEventHandler={addEventHandler}
          />
        </div>
      }

      {modal.isShow && <CalendarPopup
        data={modal.data}
        addEventHandler={addEventHandler}
        closeModal={(event) => {
          onModalHandler(modal.data, false);
        }}
        date={modal.data} />}

      {modalEvent.isShow && <EventPopup
        data={modalEvent?.data}
        // data={modalEvent?.data?.event}
        closeModalEvent={(event) => {
          onModalEventHandler(modalEvent, false);
        }}
        addEventHandler={addEventHandler}
        onModalHandler={onModalHandler}
      ></EventPopup>}
    </>
  );
}
export default memo(MonthViewLayout);

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

    const izValidDayOfWeek = (date) => {
      if (event?.values?.repeatOption.indexOf("Every weekday") > (-1)) {
        if ([0, 6].includes(moment(date).day())) return false;
      }
      return true;
    };

    const findStep = (date, repeatOption) => {
      let dayOfWeek = moment(date).day();
      let result = 0;
      let count = 0;
      let repeatOptionTemp = repeatOption.split(" ")[3];
      repeatOption = ["0", "first", "second", "third", "fourth", "last"].indexOf(repeatOptionTemp);

      if (repeatOption === 5) {
        result = moment(date).add(1, "months").endOf("month");
        while (result.day() !== dayOfWeek) {
          result = result.subtract(1, "day");
        }
        result = moment(result).diff(date, "days");
        return [result, "day"];
      }

      result = moment(date).add(1, "months").startOf("month");
      while (count !== repeatOption) {
        result = result.add(1, "day");
        if (result.day() === dayOfWeek) count++;
      }
      result = moment(result).diff(date, "days");
      return [result, "day"];
    };

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

      if (izValidDayOfWeek(dateUnix)) {
        setEvent({
          date,
          event: {
            ...event, currentDate, selectedDate, values,
          },
          doCheckRepeat: false,
        });
      }

      if (event?.values?.repeatOption.indexOf("Every weekday") > (-1)) {
        if ([1, 2, 3, 4, 5].includes(moment(dateUnix).add(1, "days").day())) {
          step = [1, "days"];
        } else { step = [(moment(dateUnix).add(1, "days").day()) / 3 + 1, "days"]; }
      }

      if (event?.values?.repeatOption.indexOf("Monthly on the") > (-1)) { step = findStep(dateUnix, event?.values?.repeatOption); }
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
    if (date === "DELETE_EVENT_BY_ID" || doCheckRepeat) {
      deleteAllEventsById(event?.eventId);
    }

    if (date !== "DELETE_EVENT_BY_ID") {
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

        if (doCheckRepeat && (event?.values?.repeatOption !== "Do not repeat")) {
          CheckRepeat({ date, event });
          return { ...prev };
        }

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

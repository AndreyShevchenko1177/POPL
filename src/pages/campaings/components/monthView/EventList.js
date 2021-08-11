import moment from "moment";
import EventListItem from "./EventListItem";

const EventList = function ({ calendarStore = {}, onModalHandler, addEventHandler }) {
  const calendarStoreArr = Object.entries(calendarStore);
  calendarStoreArr.sort((a, b) => (a[0] > b[0] ? 1 : -1));

  const eventsList = [];
  calendarStoreArr.forEach((day) => {
    day[1].forEach((event) => eventsList.push({
      event,
      date: event.currentDate,
      day: parseInt(moment(event.currentDate, "MM-DD-YYYY").format("DD"), 10),
    }));
  });

  return <>
    {eventsList.map((event) => <EventListItem
      event={event}
      key={event?.event?.eventId}
      onModalHandler={onModalHandler}
      addEventHandler={addEventHandler}
    />)}
  </>;
};

export default EventList;

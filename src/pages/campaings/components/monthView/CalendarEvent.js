import moment from "moment";
import clsx from "clsx";
import useStyles from "../../styles/styles.js";

const CalendarEvent = function ({ event, onModalHandlerEditMode }) {
  const classes = useStyles();
  let timeStart = moment(event.selectedDate.from.dayTime).format("h:mm a");
  let { title } = event.values;
  title = (title.length ? title : "No title");
  let { isAllDay } = event.values;
  // debugger

  return (
    <>
      <div
        className={clsx(classes.eventWrapper, isAllDay ? classes.eventWrapperAllDay : "")}
        onClick={(e) => {
          e.stopPropagation();
          console.log("click");
          onModalHandlerEditMode(event);
        }}
      >
        <div className={isAllDay ? classes.eventCircleAllDay : classes.eventCircleBlue}></div>
        {!isAllDay && <div className={classes.eventTime}>{timeStart}</div>}
        <div className={classes.eventTitle}>{title}</div>
      </div>
    </>
  );
};

export default CalendarEvent;

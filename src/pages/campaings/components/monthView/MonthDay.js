import { Typography } from "@material-ui/core";
import React, { memo } from "react";
import clsx from "clsx";
import moment from "moment";

import Context from "../../../../context";
import { datePicker } from "../../helper/datepicker";
import { week } from "../../constants";
import useStyles from "../../styles/styles.js";

const CalendarEvent = function ({ event, onModalHandlerEditMode }) {
  const classes = useStyles();
  let timeStart = moment(event.selectedDate.from.dayTime).format("h:mm a");
  let { title } = event.values;
  title = (title.length ? title : "No title");
  let { isAllDay } = event.values;
  // debugger
  return (
    // <div className={isAllDay ? classes.eventWrapperAllDay : classes.eventWrapper}>
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
  );
};

function Day({
  day, date, weekPosition, itemStyle, onModalHandler, dayStore,
}) {
  console.log(dayStore);

  const classes = useStyles();
  return (
    <Context.Consumer>
      {function ({ currentDay }) { // here throw handler that show modal for create event;
        return (
          <div
            className={clsx(classes.dayContainer, classes[itemStyle])}
            onClick={() => onModalHandler({ day, date }, true)}
          >
            <div className={classes.weekDay}>
              <Typography variant='caption'>
                {week[weekPosition]?.shortLabel}
              </Typography>
            </div>
            <div className={classes.dayWrapper}>
              <div className='flex justify-center'>
                <p
                  className={
                    clsx("h-35 w-35 ta-center lh-32", classes.dayNumber, { [classes.currentDay]: currentDay === date, [classes.firstMonthDayWidth]: day === 1 })
                  }
                >
                  {day === 1 ? `1 ${datePicker.getMonthName(new Date(date).getMonth() + 1).shortLabel}` : day}
                </p>

              </div>

              {dayStore?.map((event, index) => <CalendarEvent
                event={event}
                key={index}
                onModalHandlerEditMode={(event) => onModalHandler({ day, date, event }, true)} />)}

            </div>
          </div>
        );
      }
      }
    </Context.Consumer>
  );
}
export default memo(Day);

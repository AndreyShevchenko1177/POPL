import { Typography } from "@material-ui/core";
import React, { memo } from "react";
import clsx from "clsx";

import Context from "../../../../context";
import { datePicker } from "../../helper/datepicker";
import { week } from "../../constants";
import useStyles from "../../styles/styles.js";
import CalendarEvent from "./CalendarEvent";

function Day({
  day, date, weekPosition, itemStyle, onModalHandler, dayStore, onModalEventHandler, addEventHandler,
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
                onModalHandlerEditMode={(event) => onModalEventHandler({ day, date, event }, true)} />)
              }

            </div>
          </div>
        );
      }
      }
    </Context.Consumer>
  );
}
export default memo(Day);

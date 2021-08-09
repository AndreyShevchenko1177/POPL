import React, { memo, useCallback, useState } from "react";
import Calendar from "./Calendar";
import DayTime from "./DayTime";
import useStyles from "./styles/styles";

function TimeSheduler({
  selectedDate,
  handleDateChange,
  isAllDay,
}) {
  const classes = useStyles();

  const [time, setTime] = useState("");

  const setTimeHandler = useCallback((time) => {
    setTime(time);
  }, []);
  console.log(selectedDate);
  return (
    <React.Fragment>
      <Calendar
        time={time}
        name={isAllDay ? "from" : undefined}
        selectedDate={selectedDate.from.calendar}
        handleDateChange={handleDateChange}
      />
      <div className='relative flex'>
        {/* <div className={isAllDay ? classes.allDayDash : classes.dash}> */}
        <div className={classes.dash}>
          <hr></hr>
        </div>
        {!isAllDay
          ? <>
            <div className={classes.dayTimeContainer}>
              <DayTime
                name='from'
                isAllDay={isAllDay}
                setTimeHandler={setTimeHandler}
                selectedDate={selectedDate.from.dayTime}
                toTime={selectedDate.to.dayTime}
                handleDateChange={handleDateChange}
              />
            </div>
            <div className={classes.dayTimeContainer}>
              <DayTime
                name='to'
                isAllDay={isAllDay}
                setTimeHandler={setTimeHandler}
                selectedDate={selectedDate.to.dayTime}
                fromTime={selectedDate.from.dayTime}
                handleDateChange={handleDateChange}
              />
            </div>
          </>
          // : <Calendar
          //   time={time}
          //   name='to'
          //   selectedDate={selectedDate.to.calendar}
          //   handleDateChange={handleDateChange}
          // />
          : <>
            <div className={classes.dayTimeContainer}>
              <DayTime
                name='from'
                isAllDay={isAllDay}
                selectedDate={selectedDate.from.dayTime}
                toTime={selectedDate.to.dayTime}
              />
            </div>
            <div className={classes.dayTimeContainer}>
              <DayTime
                name='to'
                isAllDay={isAllDay}
                selectedDate={selectedDate.to.dayTime}
                fromTime={selectedDate.from.dayTime}
              />
            </div>
          </>
        }

      </div>

    </React.Fragment>

  );
}

export default memo(TimeSheduler);

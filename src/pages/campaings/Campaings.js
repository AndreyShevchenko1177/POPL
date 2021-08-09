import React, { memo, useState } from "react";
import MonthViewController from "./components/monthView/MonthViewController";
import MonthViewLayout from "./components/monthView/MonthViewLayout";
import CalendarHeader from "./components/CalendarHeader";
import { datePicker, correctDate } from "./helper/datepicker";
import useStyles from "./styles/styles";
import Header from "../../components/Header";
import { week } from "./constants";
import { shallowCompare } from "./helper";

function Campaings() {
  const classes = useStyles();
  const [date, setDate] = useState(new Date(correctDate(datePicker.date)));
  const [calendarView] = useState({ view: "month", quantity: 1 }); // set month quantity
  const dateLabel = `${datePicker.getMonthName(datePicker.getMonth(date)).fullLabel} ${datePicker.getYear(date)}`;
  const currentDate = `${week[new Date().getDay()].fullLabel}, ${new Date().getDate()} ${datePicker.getMonthName(new Date().getMonth() + 1).fullLabel}`;

  // const onWheelHandler = (event) => {
  //   if (event.deltaY < 0) {
  //     if (calendarView.view === "month") {
  //       let nextYear = datePicker.getYear();
  //       let nextMonth = datePicker.getMonth(date) + 1;
  //       if (`${datePicker.getMonth(date) + 1}` == 13) {
  //         nextYear += 1;
  //         nextMonth = "01";
  //       }
  //       const nextDate = new Date(`${nextMonth}-01-${nextYear}`);
  //       datePicker.setDate(nextDate);
  //       setDate(nextDate);
  //     }
  //   } else if (calendarView.view === "month") {
  //     let pastYear = datePicker.getYear();
  //     let pastMonth = datePicker.getMonth(date) - 1;
  //     if (datePicker.getMonth(date) - 1 == 0) {
  //       pastYear -= 1;
  //       pastMonth = "12";
  //     }
  //     const pastDate = new Date(`${pastMonth}-01-${pastYear}`);
  //     datePicker.setDate(pastDate);
  //     setDate(pastDate);
  //   }
  // };

  const onChangeDateHandler = (event) => {
    if (event.target.dataset.direction === "right") {
      if (calendarView.view === "month") {
        let nextYear = datePicker.getYear();
        let nextMonth = datePicker.getMonth(date) + 1;
        if (`${datePicker.getMonth(date) + 1}` == 13) {
          nextYear += 1;
          nextMonth = "01";
        }
        const nextDate = new Date(`${nextMonth}-01-${nextYear}`);
        datePicker.setDate(nextDate);
        setDate(nextDate);
      }
    } else if (event.target.dataset.direction === "left") {
      if (calendarView.view === "month") {
        let pastYear = datePicker.getYear();
        let pastMonth = datePicker.getMonth(date) - 1;
        if (datePicker.getMonth(date) - 1 == 0) {
          pastYear -= 1;
          pastMonth = "12";
        }
        const pastDate = new Date(`${pastMonth}-01-${pastYear}`);
        datePicker.setDate(pastDate);
        setDate(pastDate);
      }
    }
  };

  const onTodayHandler = () => {
    const currentDate = new Date();
    setDate((prevData) => {
      if (shallowCompare({ d: currentDate.getDate() }, { d: prevData.getDate() })) return prevData;
      return currentDate;
    });
    datePicker.setDate(currentDate);
  };

  return (
    <React.Fragment>
      <Header
        rootLink="Campaigns"
      />
      <div className={classes.root} >
        <CalendarHeader
          dateLabelToolTip={currentDate}
          dateLabel={dateLabel}
          onChangeDateHandler={onChangeDateHandler}
          onTodayHandler={onTodayHandler}
        />
        <MonthViewController quantity={calendarView.quantity} >
          <MonthViewLayout />
        </MonthViewController>
      </div>
    </React.Fragment>
  );
}

export default memo(Campaings);

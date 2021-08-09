import DatePicker, { datePicker } from "./datepicker";
import { week } from "../constants";

export const correctDaysDisplay = (quantity) => {
  if (!quantity) { // if need to generate one week with current day on it
    return datePicker.generateWeek(new Date().setDate(datePicker.date.getDate() - datePicker.date.getDay() + 1));
  }
  const days = datePicker.generateDays();
  let daysNumber = 35;
  let pastDayposition = 0;
  let futureDayPosition = 0;
  week.forEach((el, index) => {
    if (el.shortLabel === days[0].weekDay) {
      pastDayposition = index;
    }
  });

  const datepickerForPastDays = new DatePicker(new Date(`${datePicker.getMonth(new Date(days[0].date)) - 1 === 0 ? "12" : datePicker.getMonth(new Date(days[0].date)) - 1}-01-2021`));
  const datepickerForFutureDays = new DatePicker(new Date(`${datePicker.getMonth(new Date(days[0].date)) + 1 == "13" ? "01" : datePicker.getMonth(new Date(days[0].date)) + 1}-01-2021`));
  let futureDays = datepickerForFutureDays.generateDays();
  let pastDays = datepickerForPastDays.generateDays();
  pastDays = pastDays.slice(pastDays.length - pastDayposition);
  if (days.length + pastDays.length > 35) {
    daysNumber = 42;
  }
  futureDayPosition = daysNumber - (days.length + pastDays.length);
  futureDays = futureDays.slice(0, futureDayPosition);
  return [...pastDays.map((item) => ({ ...item, itemStyle: "pastDayStyle" })), ...days.map((item) => ({ ...item, itemStyle: "presentDayStyle" })), ...futureDays.map((item) => ({ ...item, itemStyle: "futureDayStyle" }))];
};

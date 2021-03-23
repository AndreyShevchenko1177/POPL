import moment from "moment";
import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

export function generateChartData(popsData, calendar) {
  let calendarRange;
  if (calendar) {
    const { maxDate, minDate } = calendar;
    let a = moment([getYear(maxDate), normalizeDate(getMonth(maxDate) + 1), normalizeDate(getDay(maxDate))]);
    let b = moment([getYear(minDate), normalizeDate(getMonth(minDate) + 1), normalizeDate(getDay(minDate))]);
    calendarRange = Math.abs(a.diff(b, "days"));
  }

  const result = {};
  const currentDate = calendarRange ? new Date(calendar.maxDate) : new Date();

  // initing result object dates
  for (let i = calendarRange || 13; i > 0; i--) {
    const date = new Date().setDate(currentDate.getDate() - i);
    const key = `${getYear(date)}-${normalizeDate(getMonth(date) + 1)}-${normalizeDate(getDay(date))}`;
    result[key] = 0;
  }
  result[`${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`] = 0;
  const [_cy, currentMonth, _cd] = `${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`.split("-");

  // counting pops quantity for last 14 days
  popsData.forEach((pop) => {
    const [_ry, receiveMonth, receiveDay] = pop[2].split(" ")[0].split("-");
    if (currentMonth === receiveMonth && _cy === _ry) {
      const date = pop[2].split(" ")[0];
      if (date in result) {
        result[date] = (result[date] || 0) + 1;
      }
    }
    // else if (
    //   (periodMonth === receiveMonth
    //         && Number(periodDay) <= Number(receiveDay))
    //       || (Number(periodMonth) < Number(receiveMonth)
    //         && Number(currentMonth) > Number(receiveMonth))
    // ) {
    //   const date = pop[2].split(" ")[0];
    //   result[date] = (result[date] || 0) + 1;
    // }
  });
  return result;
}

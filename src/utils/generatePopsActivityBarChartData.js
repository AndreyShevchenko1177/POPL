import moment from "moment";
import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

export function generateChartData(popsData, minDate, maxDate) {
  let calendarRange;
  let currentDate;
  if (!popsData.length) return;
  if (minDate) {
    const [_maxdY, _maxdM, _maxdD] = `${getYear(maxDate)}-${normalizeDate(getMonth(maxDate) + 1)}-${normalizeDate(getDay(maxDate))}`.split("-");
    const [_mindY, _mindM, _mindD] = `${getYear(minDate)}-${normalizeDate(getMonth(minDate) + 1)}-${normalizeDate(getDay(minDate))}`.split("-");
    let a = moment([_maxdY, _maxdM, _maxdD]);
    let b = moment([_mindY, _mindM, _mindD]);
    calendarRange = Math.abs(a.diff(b, "days"));
    currentDate = new Date(maxDate);
  } else {
    currentDate = new Date();
  }

  const result = {};
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

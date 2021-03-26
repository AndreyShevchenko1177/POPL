import moment from "moment";
import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

export function generateChartData(popsData, minDate, maxDate) {
  console.log("BEFORE", minDate, maxDate);
  let calendarRange;
  let currentDate;
  if (!popsData?.length) return;
  if (minDate) {
    const [_maxdY, _maxdM, _maxdD] = `${getYear(maxDate)}-${normalizeDate(getMonth(maxDate))}-${normalizeDate(getDay(maxDate))}`.split("-");
    const [_mindY, _mindM, _mindD] = `${getYear(minDate)}-${normalizeDate(getMonth(minDate))}-${normalizeDate(getDay(minDate))}`.split("-");
    let a = moment([_maxdY, _maxdM, _maxdD]);
    let b = moment([_mindY, _mindM, _mindD]);
    calendarRange = _maxdM === "02" && Number(_maxdD) === 31 ? Math.abs(a.diff(b, "days")) - 1 : Math.abs(a.diff(b, "days"));
    currentDate = new Date(maxDate);
  } else {
    currentDate = new Date();
  }

  const result = {};
  let date = currentDate.setHours(0, 0, 0, 0);

  // initing result object dates
  if (calendarRange !== 0) {
    for (let i = calendarRange || 13; i > 0; i--) {
      date -= 86400000;
      const normalFormat = new Date(date);
      const key = `${getYear(normalFormat)}-${normalizeDate(getMonth(normalFormat) + 1)}-${normalizeDate(getDay(normalFormat))}`;
      result[key] = 0;
    }
  }
  result[`${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`] = 0;
  const transformResult = {};
  const dateArray = Object.keys(result).map((el) => ({ d: new Date(el).setHours(0, 0, 0, 0), v: result[el] }));
  dateArray.sort((a, b) => a.d - b.d).forEach(({ d, v }) => {
    const normalFormat = new Date(d);
    const key = `${getYear(normalFormat)}-${normalizeDate(getMonth(normalFormat) + 1)}-${normalizeDate(getDay(normalFormat))}`;
    transformResult[key] = v;
  });

  popsData.forEach((pop) => {
    const date = pop[2].split(" ")[0];
    if (date in transformResult) {
      transformResult[date] = (transformResult[date] || 0) + 1;
    }
  });
  console.log("AFTER", result, transformResult);
  return transformResult;
}

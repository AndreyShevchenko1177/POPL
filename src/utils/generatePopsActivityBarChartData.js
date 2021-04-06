import moment from "moment";
import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

export function generateChartData(popsData, minDate, maxDate) {
  let calendarRange;
  let currentDate;
  if (!Object.values(popsData)?.length) return;
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
  // let date = currentDate.setHours(0, 0, 0, 0);
  // console.log(calendarRange, currentDate);

  console.log("DATES", "\n\n", new Date(), "\n\n");
  // initing result object dates
  if (typeof calendarRange === "undefined") {
    for (let i = 13; i > 0; i--) {
      const date = new Date().setDate(currentDate.getDate() - i);
      // const normalFormat = new Date(date);
      const key = `${getYear(date)}-${normalizeDate(getMonth(date) + 1)}-${normalizeDate(getDay(date))}`;
      result[key] = 0;
    }
  }
  if (calendarRange > 0) {
    for (let i = calendarRange; i > 0; i--) {
      // console.log(new Date(currentDate), new Date(new Date(currentDate).setDate(currentDate.getDate() - i)));
      const date = new Date(currentDate).setDate(currentDate.getDate() - i);
      const key = `${getYear(date)}-${normalizeDate(getMonth(date) + 1)}-${normalizeDate(getDay(date))}`;
      result[key] = 0;
    }
  }
  result[`${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`] = 0;
  console.log("DATES", "\n\n", `${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`, "\n\n");
  console.log("DATES", "\n\n", `${getYear(new Date())}-${normalizeDate(getMonth(new Date()) + 1)}-${normalizeDate(getDay(new Date()))}`, "\n\n");

  const data = {};
  Object.keys(popsData).forEach((popKey) => {
    let ownResult = { ...result };
    popsData[popKey].forEach((item) => {
      const date = item[2].split(" ")[0];
      if (date in result) {
        ownResult[date] = (ownResult[date] || 0) + 1;
      }
    });
    data[popKey] = ownResult;
  });
  console.log("generate");
  // Object.keys(popsData).forEach((pop) => {
  // popsData[pop].forEach((item) => {
  //   const date = item[2].split(" ")[0];
  //   if (date in result) {
  //     const data = { [pop]: (result[date][pop] || 0) + 1 };
  //     result[date] = { ...data };
  //   }
  // });
  // });
  // console.log("AFTER", result);
  return { ...data, labels: Object.keys(result) };
}

import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

export function generateChartData(popsData) {
  const result = {};
  const currentDate = new Date();
  const periodDate = new Date().setDate(currentDate.getDate() - 13);

  // initing result object dates
  for (let i = 13; i > 0; i--) {
    const date = new Date().setDate(currentDate.getDate() - i);
    const key = `${getYear(date)}-${normalizeDate(getMonth(date) + 1)}-${normalizeDate(getDay(date))}`;
    result[key] = 0;
  }
  result[`${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`] = 0;
  const [_cy, currentMonth, _cd] = `${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`.split("-");
  const [_py, periodMonth, periodDay] = `${getYear(periodDate)}-${normalizeDate(getMonth(periodDate) + 1)}-${normalizeDate(getDay(periodDate))}`.split("-");

  // counting pops quantity for last 30 days
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

export const getYear = (d) => new Date(d).getFullYear();
export const getMonth = (d) => new Date(d).getMonth();
export const getDay = (d) => new Date(d).getDate();
export const getHours = (d) => new Date(d).getHours();
export const getMinutes = (d) => new Date(d).getMinutes();

export const normalizeDate = (d) => (d <= 9 ? `0${d}` : d);

export const getMothName = (monthNumber) => months[monthNumber];

export function dateFormat(date, isTime) {
  if (date === "0000-00-00 00:00:00") {
    return `${getYear(new Date())}/${normalizeDate(
      getMonth(new Date()) + 1,
    )}/${normalizeDate(getDay(new Date()))} ${isTime ? "00:00" : ""}`;
  }
  if (!date || new Date(date) == "Invalid Date") return "Invalid date";

  return `${getYear(date)}/${normalizeDate(getMonth(date) + 1)}/${normalizeDate(
    getDay(date),
  )} ${isTime ? `${normalizeDate(getHours(date))}:${normalizeDate(getMinutes(date))}` : ""}`;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

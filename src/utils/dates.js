export const getYear = (d) => new Date(d).getFullYear();
export const getMonth = (d) => new Date(d).getMonth();
export const getDay = (d) => new Date(d).getDate();
export const getHours = (d) => new Date(d).getHours();
export const getMinutes = (d) => new Date(d).getMinutes();

export const normalizeDate = (d) => (d <= 9 ? `0${d}` : d);

export const getMothName = (monthNumber) => months[monthNumber];

export function dateFormat(date, isTime) {
  if (date === "0000-00-00 00:00:00") {
    return `${normalizeDate(
      getMonth(new Date()) + 1,
    )}/${normalizeDate(getDay(new Date()))}/${getYear(new Date())} ${isTime ? "00:00" : ""}`;
  }
  if (!date || new Date(date) == "Invalid Date") return "Invalid date";

  return `${normalizeDate(getMonth(date) + 1)}/${normalizeDate(
    getDay(date),
  )}/${getYear(date)} ${isTime ? `${normalizeDate(getHours(date))}:${normalizeDate(getMinutes(date))}` : ""}`;
}

export function formatDateConnections(date) {
  const dateArray = [date.split(",")[1].split("/")[0].trim(), ...date.split(",")[1].split("/")[1].split(" ")];
  if (dateArray.length < 3) return dateFormat(`${dateArray.join("/")}/2020`);
  return dateFormat(dateArray.join("/"));
}

export const months = [
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

export const monthsFullName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

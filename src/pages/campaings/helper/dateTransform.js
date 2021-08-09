import { normalizeDate } from "../../../utils";

export const dateTransform = (firstPart, secondPart = new Date(), hour = 0) => {
  if (hour === -1 && new Date(secondPart).getHours() === 23) {
    return new Date(`${new Date(firstPart).getMonth() + 1}/${new Date(firstPart).getDate() + 1}/${new Date(firstPart).getFullYear()} 00:${normalizeDate(new Date(secondPart).getMinutes())}`);
  }
  return new Date(`${new Date(firstPart).getMonth() + 1}/${new Date(firstPart).getDate()}/${new Date(firstPart).getFullYear()} ${normalizeDate(new Date(secondPart).getHours() - hour)}:${normalizeDate(new Date(secondPart).getMinutes())}`);
};
export const dateCalendarTrasform = (firstPart, secondPart = new Date(), hour = 0) => {
  if (hour === -1 && new Date(secondPart).getHours() === 23) {
    return `${new Date(firstPart).getMonth() + 1}/${new Date(firstPart).getDate() + 1}/${new Date(firstPart).getFullYear()} 00:${normalizeDate(new Date(secondPart).getMinutes())}`;
  }
  if (new Date(secondPart).getMinutes() % 15 !== 0) {
    return `${new Date(firstPart).getMonth() + 1}/${new Date(firstPart).getDate()}/${new Date(firstPart).getFullYear()} ${normalizeDate(new Date(secondPart).getHours() - hour)}:30`;
  }
  return `${new Date(firstPart).getMonth() + 1}/${new Date(firstPart).getDate()}/${new Date(firstPart).getFullYear()} ${normalizeDate(new Date(secondPart).getHours() - hour)}:${normalizeDate(new Date(secondPart).getMinutes())}`;
};

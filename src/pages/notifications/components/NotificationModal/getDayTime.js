import { normalizeDate } from "../../../../utils";

function getDayTime(interval = 15) {
  const dayMiliseconds = 86400000;
  const minutes = 60;
  const milliseconds = 1000;
  const result = interval * minutes * milliseconds;
  const intervalParts = dayMiliseconds / result;
  let dates = [];
  for (let i = intervalParts, dayTime = 86400000; i > 0; i--) {
    dayTime -= result;
    dates.push({ title: `${new Date(dayTime).getHours()} ${normalizeDate(new Date(dayTime).getMinutes())}`, value: new Date(dayTime) });
  }
  // dates = dates.filter((el) => el.title.split(" ")[0] < 13).sort((a, b) => Number(a.title.split(" ").join("")) - Number(b.title.split(" ").join("")));
  // dates = dates.slice(4);
  // dates = [...dates.filter((_, i, arr) => i >= arr.length - 4), ...dates.filter((_, i, arr) => i < arr.length - 4)];
  // dates = [...dates.map((el) => ({ ...el, title: `${el.title.split(" ").join(":")} am` })), ...dates.map((el) => ({ ...el, title: `${el.title.split(" ").join(":")} pm` }))];

  let amDates = dates.filter((el) => el.title.split(" ")[0] < 13).sort((a, b) => Number(a.title.split(" ").join("")) - Number(b.title.split(" ").join("")));
  let pmDates = dates.filter((el) => el.title.split(" ")[0] >= 12).sort((a, b) => Number(a.title.split(" ").join("")) - Number(b.title.split(" ").join("")));
  amDates = amDates.slice(4);
  amDates = [...amDates.filter((_, i, arr) => i >= arr.length - 4), ...amDates.filter((_, i, arr) => i < arr.length - 4)];
  pmDates = [...pmDates.filter((_, i, arr) => i < arr.length - 4), ...pmDates.filter((_, i, arr) => i >= arr.length - 4)];
  dates = [...amDates.map((el) => ({ ...el, title: `${el.title.split(" ").join(":")} am` })), ...pmDates.map((el, i) => ({ ...el, title: `${amDates[i].title.split(" ").join(":")} pm` }))];
  return dates;
}

export default getDayTime;

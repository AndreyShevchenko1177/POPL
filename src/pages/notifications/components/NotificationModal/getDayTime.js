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
  dates.sort((a, b) => Number(a.title.split(" ").join("")) - Number(b.title.split(" ").join("")));
  dates = dates.map((el, index, arr) => (index >= arr.length / 2 ? { ...el, title: `${el.title.split(" ").join(":")} pm` } : { ...el, title: `${el.title.split(" ").join(":")} am` }));
  return dates;
}

export default getDayTime;

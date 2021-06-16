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

  let amDates = dates.filter((el) => el.title.split(" ")[0] < 13).sort((a, b) => Number(a.title.split(" ").join("")) - Number(b.title.split(" ").join("")));
  let pmDates = dates.filter((el) => el.title.split(" ")[0] >= 12).sort((a, b) => Number(a.title.split(" ").join("")) - Number(b.title.split(" ").join("")));
  amDates = amDates.slice(4);
  amDates = [...amDates.filter((_, i, arr) => i >= arr.length - 4), ...amDates.filter((_, i, arr) => i < arr.length - 4)].map((el, index) => (index < 4 ? ({ ...el, value: new Date(el.value.setHours(0, el.value.getMinutes(), 0, 0)) }) : el));
  pmDates = [...pmDates.filter((_, i, arr) => i < arr.length - 4), ...pmDates.filter((_, i, arr) => i >= arr.length - 4)].map((el, index) => (index < 4 ? ({ ...el, value: new Date(el.value.setHours(12, el.value.getMinutes(), 0, 0)) }) : el));
  dates = [...amDates.map((el) => ({ ...el, title: `${el.title.split(" ").join(":")} am` })), ...pmDates.map((el, i) => ({ ...el, title: `${amDates[i].title.split(" ").join(":")} pm` }))];
  return dates;
}

export default getDayTime;

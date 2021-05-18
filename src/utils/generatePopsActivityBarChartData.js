/* eslint-disable no-return-assign */
import moment from "moment";
import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

const dateGeneration = (popsData, minDate, maxDate) => {
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
  // console.log("RESULT", result);
  result[`${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}`] = 0;
  result[`${getYear(currentDate)}-${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate) + 1)}`] = 0;
  console.log("RESULT", result);
  return result;
};

export const generateLineChartData = (popsData, minDate, maxDate) => {
  const result = dateGeneration(popsData, minDate, maxDate);
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
  return { ...data, labels: Object.keys(result) };
};

export const generateDohnutChartData = (popsData, isPopsData, minDate, maxDate, isAllData) => {
  let result = {};
  if (isAllData) {
    popsData.allPops.forEach((item) => {
      result[item[2].split(" ")[0]] = 0;
    });
  } else {
    result = dateGeneration(popsData, minDate, maxDate);
  }
  const data = {};
  const { allPops, ...newPopsData } = popsData;

  Object.keys(newPopsData).forEach((popKey) => {
    let ownResult = { ...result };
    let correctResult = {};
    popsData[popKey].forEach((item) => {
      const date = item[2].split(" ")[0];
      const direct = item[3];
      if (date in result) {
        if (isPopsData) return ownResult[date] = (ownResult[date] || 0) + 1;
        if (direct == "1") {
          ownResult[date] = { ...(ownResult[date] || {}), directOn: (ownResult[date]?.directOn || 0) + 1 };
        } else {
          ownResult[date] = { ...(ownResult[date] || {}), directOff: (ownResult[date]?.directOff || 0) + 1 };
        }
      }
    });
    Object.keys(ownResult).forEach((item) => (ownResult[item] ? correctResult[item] = ownResult[item] : null));
    data[popKey] = correctResult;
  });
  return data;
};

export const generateAllData = (popsData) => {
  const result = {};
  popsData.allPops.forEach((item) => {
    result[item[2].split(" ")[0]] = 0;
  });
  const data = {};

  Object.keys(popsData).forEach((popKey) => {
    let ownResult = { ...result };
    popsData[popKey].forEach((item) => {
      const date = item[2].split(" ")[0];
      if (date in result) {
        ownResult[date] = (ownResult[date] || 0) + 1;
      }
    });
    Object.keys(ownResult).forEach((item) => ownResult[item]);
    data[popKey] = ownResult;
  });
  const momentDates = Object.keys(result).map((d) => moment(d));
  return { data: { ...data, labels: Object.keys(result) }, maxDate: moment.max(momentDates), minDate: moment.min(momentDates) };
};

export const generateDohnutPopsByProfileData = (profileData, popsData, minDate, maxDate, isAllData) => {
  let result = {};
  const data = {};
  if (isAllData) {
    popsData.allPops.forEach((item) => {
      result[item[2].split(" ")[0]] = 0;
    });
  } else {
    result = dateGeneration(popsData, minDate, maxDate);
  }
  const { allPops } = popsData;
  profileData.forEach(({ id, name }) => {
    let ownResult = { ...result };
    let correctResult = {};
    Object.values(allPops).forEach((item) => {
      const date = item[2].split(" ")[0];
      const profileId = item[0];
      if (date in result) {
        if (id == profileId) {
          ownResult[date] = (ownResult[date] || 0) + 1;
        }
      }
    });
    Object.keys(ownResult).forEach((item) => (ownResult[item] ? correctResult[item] = ownResult[item] : null));
    data[name] = correctResult;
  });
  return data;
};

/* eslint-disable no-return-assign */
import moment from "moment";
import { isSafari } from "../constants";
import {
  getYear, getMonth, getDay, normalizeDate,
} from "./dates";

const dateGeneration = (popsData, minDate, maxDate) => {
  let calendarRange;
  let currentDate;
  if (!Object.values(popsData)?.length) return;
  if (minDate) {
    const [_maxdY, _maxdM, _maxdD] = `${getYear(maxDate)}-${normalizeDate(getMonth(maxDate))}-${normalizeDate(getDay(maxDate))}`.split("-");
    const [_mindY, _mindM, _mindD] = `${getYear(maxDate)}-${normalizeDate(getMonth(minDate))}-${normalizeDate(getDay(minDate))}`.split("-");
    let a = moment([_maxdY, _maxdM, _maxdD]);
    let b = moment([_mindY, _mindM, _mindD]);
    calendarRange = Math.abs(a.diff(b, "days"));
    currentDate = new Date(maxDate);
  } else {
    currentDate = new Date();
  }

  const result = {};

  // initing result object dates
  if (typeof calendarRange === "undefined") {
    for (let i = 13; i > 0; i--) {
      const date = new Date().setDate(currentDate.getDate() - i);
      // const normalFormat = new Date(date);
      const key = `${normalizeDate(getMonth(date) + 1)}-${normalizeDate(getDay(date))}-${getYear(date)}`;
      result[key] = 0;
    }
  }

  if (calendarRange > 0) {
    for (let i = calendarRange; i > 0; i--) {
      const date = new Date(currentDate).setDate(currentDate.getDate() - i);
      const key = `${normalizeDate(getMonth(date) + 1)}-${normalizeDate(getDay(date))}-${getYear(date)}`;
      result[key] = 0;
    }
  }
  result[`${normalizeDate(getMonth(currentDate) + 1)}-${normalizeDate(getDay(currentDate))}-${getYear(currentDate)}`] = 0;
  return result;
};

export const generateLineChartData = (popsData, minDate, maxDate) => {
  const result = dateGeneration(popsData, minDate, maxDate);
  const data = {};
  Object.keys(popsData).forEach((popKey) => {
    let ownResult = { ...result };
    popsData[popKey].forEach((item) => {
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`;
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
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
      result[date] = 0;
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
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
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
    const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
    result[date] = 0;
  });
  const data = {};

  Object.keys(popsData).forEach((popKey) => {
    let ownResult = { ...result };
    popsData[popKey].forEach((item) => {
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`;
      if (date in result) {
        ownResult[date] = (ownResult[date] || 0) + 1;
      }
    });
    Object.keys(ownResult).forEach((item) => ownResult[item]);
    data[popKey] = ownResult;
  });
  if (isSafari) {
    const safariDates = Object.keys(result).map((el) => el.split("-").join("/")).map((el) => new Date(el).getTime()).sort((a, b) => b - a);
    console.log(safariDates);
    return { data: { ...data, labels: Object.keys(result) }, maxDate: safariDates[0], minDate: safariDates[safariDates.length - 1] };
  }
  const momentDates = Object.keys(result).map((d) => moment(d));
  return { data: { ...data, labels: Object.keys(result) }, maxDate: moment.max(momentDates), minDate: moment.min(momentDates) };
};

export const generateDohnutPopsByProfileData = (profileData, popsData, minDate, maxDate, isAllData) => {
  let result = {};
  const data = {};
  if (isAllData) {
    popsData.allPops.forEach((item) => {
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
      result[date] = 0;
    });
  } else {
    result = dateGeneration(popsData, minDate, maxDate);
  }
  const { allPops } = popsData;
  profileData.forEach(({ id, name }) => {
    let ownResult = { ...result };
    let correctResult = {};
    Object.values(allPops).forEach((item) => {
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
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

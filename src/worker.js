import heicConvert from "heic-convert";
import moment from "moment";

// we can't import these functions from outside of this file, cause worker can't use them this way
// WORKERS UTILS
// const isSafari = /constructor/i.test(self.HTMLElement)
//     || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; }(!self.safari || (typeof self.safari !== "undefined" && self.safari.pushNotification)));

const filterPops = {
  slicePoplNameFromPop: (popValue) => {
    const result = popValue.slice(-14);
    return result && result.length === 14 ? result : null;
  },
  filterPoplPops: (popValue) => {
    // console.log(popValue[0]);
    const values = ["r", "k", "b", "h"];
    if (values.includes(popValue[0])) return true;
    // for pops that have popl. popl name has length of 14 characters
    if (popValue.length > 14) {
      return filterPops.slicePoplNameFromPop(popValue) === "xl";
    }
    // if no popl popValue should be equal "xl"
    return popValue === "xl";
  },
  filterQrCodePops: (popValue) => {
    const values = ["q", "a"];
    return values.includes(popValue[0]);
  },
  filterWalletPops: (popValue) => {
    const values = ["w"];
    return values.includes(popValue[0]);
  },
};

// dates functions
const normalizeDate = (d) => (d <= 9 ? `0${d}` : d);
const getYear = (d) => new Date(d).getFullYear();
const getMonth = (d) => new Date(d).getMonth();
const getDay = (d) => new Date(d).getDate();

const dateGeneration = (popsData, minDate, maxDate) => {
  let calendarRange;
  let currentDate;
  if (!Object.values(popsData)?.length) return;
  if (minDate) {
    const [_maxdY, _maxdM, _maxdD] = `${getYear(maxDate)}-${normalizeDate(getMonth(maxDate))}-${normalizeDate(getDay(maxDate))}`.split("-");
    const [_mindY, _mindM, _mindD] = `${getYear(minDate)}-${normalizeDate(getMonth(minDate))}-${normalizeDate(getDay(minDate))}`.split("-");
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

const chooseAccountImage = ({ activeProfile, image, imageBusiness }, companyInfo) => {
  let result = "";
  if (activeProfile === "2") {
    result = (imageBusiness && `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + imageBusiness}?alt=media`)
      || (image && `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + image}?alt=media`)
      || "";
  } else {
    result = (image && `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + image}?alt=media`)
      || (imageBusiness && `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + imageBusiness}?alt=media`)
      || "";
  }
  if (!result) {
    return companyInfo[3] && `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${companyInfo[3]}?alt=media`;
  }
  return result;
};

// ==============================================================

export async function heicToJpg(file) {
  const buffer = await file.arrayBuffer();
  try {
    const outputBuffer = await heicConvert({
      buffer: Buffer.from(buffer), // the HEIC file buffer
      format: "JPEG", // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });
    return outputBuffer;
  } catch (error) {
    console.log({ ...error });
  }
}

export function linkTapsWidgetCalculation(funcArguments) {
  const {
    linksTaps, dateRange, location, profilesData,
  } = JSON.parse(funcArguments);
  let links = [];
  const calculateTapsByLinkHash = (hash) => {
    const result = linksTaps.filter((tap) => {
      const linkDate = moment(tap.event_at).format("x");
      return tap.hash === hash // checking does hash equal
      && (linkDate > moment(dateRange[0]).format("x")) // checking link tap date not predates date range
      && (linkDate < moment(dateRange[1]).format("x")); // checking link tap date not postdates date range
    });
    return result.length;
  };
  if (location.state?.id) { // checking does we going from specific profile
    if (location.state?.personalMode?.text === "Personal") { // checking mode of profile - Personal or Business
      links = location.state.social.map((link) => ({ ...link, profileName: location.state.name, clicks: calculateTapsByLinkHash(link.hash) }));
    } else {
      links = location.state.business.map((link) => ({ ...link, profileName: location.state.name, clicks: calculateTapsByLinkHash(link.hash) }));
    }
  } else {
    profilesData.forEach((profile) => {
      links = profile.activeProfile === "1"
        ? [...links, ...profile.social.map((link) => ({ ...link, profileName: profile.name, clicks: calculateTapsByLinkHash(link.hash) }))]
        : [...links, ...profile.business.map((link) => ({ ...link, profileName: profile.name, clicks: calculateTapsByLinkHash(link.hash) }))];
    });
  }
  return links;
}

export function topViewedViews(funcArguments) {
  const {
    profilesData, viewsBottom, dateRange, companyInfo,
  } = JSON.parse(funcArguments);
  const result = [];
  profilesData.forEach((profile) => {
    let profilesNumber = 0;
    viewsBottom.forEach((view) => {
      const viewsDate = moment(view[2]).format("x");
      if (view[0] == profile.id) {
        if ((viewsDate > moment(dateRange[0]).format("x")) && (viewsDate < moment(dateRange[1]).format("x"))) profilesNumber += 1;
      }
    });
    result.push({ name: profile.name, value: profilesNumber, image: chooseAccountImage(profile, companyInfo) });
  });
  return result;
}

export function topPoppedPopls(funcArguments) {
  const {
    totalPopls, totalPops, dateRange,
  } = JSON.parse(funcArguments);

  function slicePoplNameFromPop(popValue) {
    const result = popValue.slice(-14);
    return result && result.length === 14 ? result : null;
  }

  const topPoppedPopls = {};
  totalPopls.forEach((popl) => topPoppedPopls[popl.name] = []);

  totalPops.forEach((pop) => {
    const popDate = moment(pop[2]).format("x");
    const name = slicePoplNameFromPop(pop[1]);
    if (name && name in topPoppedPopls) {
      if ((popDate > moment(dateRange[0]).format("x")) && (popDate < moment(dateRange[1]).format("x"))) topPoppedPopls[name].push(pop);
    }
  });
  const sortedPoppedPopls = Object.keys(topPoppedPopls)
    .map((key) => ({ [key]: topPoppedPopls[key] }))
    .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);

  const result = [];
  sortedPoppedPopls.forEach((item) => {
    result.push({ name: Object.keys(item)[0], value: Object.values(item)[0].length });
  });
  return result;
}

// this function calling in OverallAnalytics file in useEffect with allPopsData and location and calculating pops data on popl level
export function overallAnalyticsPopsPoplLevel(funcArguments) {
  const { allPopsData, location } = JSON.parse(funcArguments);

  const poplPops = [];
  const qrCodePops = [];
  const walletPops = [];
  const filteredPops = allPopsData.allPops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === location.state.poplName);
  filteredPops.forEach((pop) => {
    if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
    if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
    if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
  });

  return { poplPops, qrCodePops, walletPops };
}

// FUNCTION FROM UTILS FOR CHARTS DATA GENERATION
export function generateDohnutChartData(funcArguments) {
  const {
    popsData, isPopsData, minDate, maxDate, isAllData,
  } = JSON.parse(funcArguments);
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
}

export function generateAllData(funcArguments) {
  const { popsData, isSafari } = JSON.parse(funcArguments);
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
    return { data: { ...data, labels: Object.keys(result) }, maxDate: safariDates[0], minDate: safariDates[safariDates.length - 1] };
  }
  const momentDates = Object.keys(result).map((d) => moment(d));
  return JSON.stringify({ data: { ...data, labels: Object.keys(result) }, maxDate: moment.max(momentDates), minDate: moment.min(momentDates) });
}

export function generateLineChartData(funcArguments) {
  const { popsData, minDate, maxDate } = JSON.parse(funcArguments);
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
}

// export const generateDohnutPopsByProfileData = (funcArguments) => {
//   const {
//     profileData, popsData, minDate, maxDate, isAllData, linkTaps, viewsKpis,
//   } = JSON.parse(funcArguments);
//   let result = {};
//   let taps = {};
//   let views = {};
//   const data = {};
// if (isAllData) {
//   popsData.allPops.forEach((item) => {
//     const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
//     result[date] = 0;
//   });
// } else {
//   result = dateGeneration(popsData, minDate, maxDate);
// }
//   const { allPops } = popsData;
//   profileData.forEach(({ id, name }) => {
//     let ownResult = { ...result };
//     let correctResult = {};
//     Object.values(allPops).forEach((item) => {
//       const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
//       const profileId = item[0];
//       if (date in result) {
//         if (id == profileId) {
//           ownResult[date] = (ownResult[date] || 0) + 1;
//         }
//       }
//     });
//     linkTaps.forEach(({ pid, event_at }) => {
//       const date = `${event_at.slice(5, 10)}-${event_at.slice(0, 4)}`;
//       if (date in result) {
//         if (id == pid) {
//           taps[date] = (taps[date] || 0) + 1;
//         }
//       }
//     });
//     viewsKpis.forEach((item) => {
//       const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
//       const profileId = item[0];
//       if (date in result) {
//         if (id == profileId) {
//           views[date] = (views[date] || 0) + 1;
//         }
//       }
//     });

//     Object.keys(ownResult).forEach((item) => (ownResult[item] ? correctResult[item] = ownResult[item] : null));
//     data[name] = correctResult;
//   });
//   return data;
// };

export const profileLineDataChart = (funcArguments) => {
  const {
    profilesData, popsData, minDate, maxDate,
  } = JSON.parse(funcArguments);
  let result = {};
  const data = {};
  result = dateGeneration(popsData, minDate, maxDate);
  const { allPops } = popsData;
  profilesData.forEach(({ id, name }) => {
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
    Object.keys(result).forEach((el) => {
      if (!correctResult[el]) correctResult[el] = 0;
    });
    data[name] = correctResult;
  });
  return {
    isProfile: true, labels: Object.keys(result), data: Object.keys(data).map((el) => ({ name: el, dateValues: data[el], value: Object.values(data[el]).reduce((s, c) => s + c, 0) })).sort((a, b) => b.value - a.value),
  };
};

export const generateDohnutPopsByProfileData = (funcArguments) => {
  const {
    profileData, popsData, minDate, maxDate, isAllData, linkTaps, viewsKpis,
  } = JSON.parse(funcArguments);
  let result = {};
  let taps = {};
  let views = {};
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
  profileData.forEach(({ id, name, image }) => {
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
    linkTaps.forEach(({ pid, event_at }) => {
      const date = `${event_at.slice(5, 10)}-${event_at.slice(0, 4)}`;
      if (date in result) {
        if (id == pid) {
          taps[date] = (taps[date] || 0) + 1;
        }
      }
    });
    viewsKpis.forEach((item) => {
      const date = `${item[2].slice(5, 10)}-${item[2].slice(0, 4)}`; // using to pass year in the end of date string for Pacific Timezone. in this timezone getDay() method returns day behind. eg. "2021-05-21" returns 20
      const profileId = item[0];
      if (date in result) {
        if (id == profileId) {
          views[date] = (views[date] || 0) + 1;
        }
      }
    });
    Object.keys(ownResult).forEach((item) => (ownResult[item] ? correctResult[item] = ownResult[item] : null));
    data[name] = {
      result: correctResult,
      ctr: `${(Object.values(taps).reduce((s, c) => s + c, 0) / Object.values(views).reduce((s, c) => s += c, 0) * 100).toFixed(1)}%`,
      image,
      id,
    };
  });
  return {
    data: Object.keys(data).map((item) => ({
      popsCount: Object.values(data[item].result).reduce((s, c) => s += c, 0), ctr: data[item].ctr, image: data[item].image, name: item || "No name", id: data[item].id,
    })).sort((a, b) => b.popsCount - a.popsCount),
  };
};

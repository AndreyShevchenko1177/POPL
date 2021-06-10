import heicConvert from "heic-convert";
import moment from "moment";

// we can't import these function from outside of this file, cause worker can't use them this way
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
  const { profilesData, viewsBottom, dateRange } = JSON.parse(funcArguments);
  const result = [];
  profilesData.forEach((profile) => {
    let profilesNumber = 0;
    viewsBottom.forEach((view) => {
      const viewsDate = moment(view[2]).format("x");
      if (view[0] == profile.id) {
        if ((viewsDate > moment(dateRange[0]).format("x")) && (viewsDate < moment(dateRange[1]).format("x"))) profilesNumber += 1;
      }
    });
    result.push({ name: profile.name, value: profilesNumber });
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

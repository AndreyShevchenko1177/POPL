/* eslint-disable brace-style */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import worker from "workerize-loader!../../worker";
import NetworkActivity from "./components/timeLine";
import {
  cleanAction, clearChecboxAction, mainAnalyticsAction, setCheckboxAction,
} from "./store/actions";
import {
  getYear, getMonth, getDay, monthsFullName,
} from "../../utils";
import Header from "../../components/Header";
import useStyles from "./styles";
import BottomWidgets from "./components/widgets";
import { isSafari } from "../../constants";

function OverallAnalytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [options, setOption] = useState("");
  const [popsData, setPopsData] = useState(null);
  const [popsLineData, setPopsLineData] = useState(null);
  const [deviceLineData, setDeviceLineData] = useState(null);
  const [popsDeviceData, setPopsDeviceData] = useState(null);
  const [profileCountFilter, setProfileCountFilter] = useState({
    changeByTap: "", changeByKey: "",
  });
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const allPopsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPopsNew.data,
  );
  const devices = useSelector(
    ({ poplsReducer }) => poplsReducer.allPopls.data,
  );
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const [chartData, setChartData] = useState({
    dohnutDirectData: null,
    dohnutPopsData: null,
    lineData: null,
    dohnutPopsByProfileData: null,
  });
  const [viewsKpis, setViewsKpis] = useState(null);
  const [saveSelected, setSaveSelected] = useState(false);
  const viewsBottom = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.viewsBottom.data);
  const linkTaps = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.linkTapsBottom.data);
  const checkboxes = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.checkBoxData);
  const minTimestamp = new Date().getTime() - (86400000 * 13);
  const currentDate1 = `${monthsFullName[getMonth(minTimestamp)]} ${getDay(minTimestamp)}, ${getYear(minTimestamp)}-`;
  const currentDate2 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  )}, ${getYear(new Date())}`;
  const [calendar, setCalendar] = useState({
    visible: false,
    dateRange: [new Date(currentDate1.slice(0, currentDate1.length - 1)), new Date(currentDate2)],
    normalData: [currentDate1, currentDate2],
  });
  const [filterValue, setFilterValue] = useState("");
  const [isChartsDataCalculating, setIsChartDataCalculating] = useState({ // when data recalculating locally running preloader
    lineChart: false,
    dohnutDirectData: false,
    dohnutPopsData: false,
    dohnutPopsByProfileData: false,
  });
  const [workerInstance] = useState(() => worker());
  const selectedProfiles = Object.keys(checkboxes.profiles).filter((el) => checkboxes.profiles[el]).map((el) => Number(el));
  const isSelected = Object.values(checkboxes.profiles).includes(true);
  const [percentagePopsKpisData, setPercentagePopsKpisData] = useState(null); // pops for previous date range relative to current
  const [isAllTime, setIsAllTime] = useState(false);

  const handleRefresh = () => {
    setPopsData(null);
    setPopsLineData(null);
    setViewsKpis(null);
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
      dohnutPopsByProfileData: null,
    });
    dispatch(cleanAction());
    // dispatch(clearChecboxAction());
    dispatch(mainAnalyticsAction());
  };

  const setDate = (minDate, maxDate) => {
    setIsAllTime(false);
    setOption("");
    let minD = `${monthsFullName[getMonth(minDate)]} ${getDay(
      minDate,
    )}, ${getYear(minDate)}-`;
    let maxD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
      maxDate,
    )}, ${getYear(maxDate)}`;
    const maxDateMilis = maxDate.setHours(0, 0, 0, 0);
    const minDateMilis = minDate.setHours(0, 0, 0, 0);
    const currentDateMilis = new Date(currentDate2).setHours(0, 0, 0, 0);
    if (maxDateMilis > currentDateMilis) {
      maxDate = new Date(currentDate2);
      maxD = currentDate2;
    }
    if (minDateMilis > currentDateMilis) {
      minDate = new Date(currentDate2);
      minD = currentDate2;
    }
    if (maxDateMilis < minDateMilis) { // from this condition depends order of maxDate and minDate parameters in generateDohnutChartData function
      // running preloaser for charts
      setIsChartDataCalculating({
        lineChart: true,
        dohnutDirectData: true,
        dohnutPopsData: true,
        dohnutPopsByProfileData: true,
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: false, minDate, maxDate, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
      })).then((dohnutDirectData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutDirectData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
      });

      workerInstance.generateLineChartData(JSON.stringify({
        popsData, maxDate, minDate,
      })).then(({ lineData, percentageData }) => {
        if (location.pathname !== window.location.pathname) return;
        setPercentagePopsKpisData(percentageData);
        setChartData((prev) => ({
          ...prev,
          lineData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
      });
      workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
        profileData: !isSelected ? profilesData.map(({
          id, name, image, activeProfile, imageBusiness,
        }) => ({
          id, name, image, activeProfile, imageBusiness,
        })) : profilesData.map(({
          id, name, image, activeProfile, imageBusiness,
        }) => ({
          id, name, image, activeProfile, imageBusiness,
        })).filter((el) => selectedProfiles.includes(Number(el.id))),
        popsData,
        minDate,
        maxDate,
        linkTaps,
        viewsKpis: viewsBottom,
      })).then((dohnutPopsByProfileData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dohnutPopsByProfileData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: true, minDate, maxDate, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
      })).then((dohnutPopsData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutPopsData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
      });

      return setCalendar({
        ...calendar,
        dateRange: [maxDate, minDate],
        normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
        visible: false,
      });
    }

    setCalendar({
      ...calendar,
      dateRange: [minDate, maxDate],
      normalData: [minD, maxD],
      visible: false,
    });

    // running preloaser for charts
    setIsChartDataCalculating({
      lineChart: true,
      dohnutDirectData: true,
      dohnutPopsData: true,
      dohnutPopsByProfileData: true,
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: false, minDate, maxDate, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
    })).then((dohnutDirectData) => {
      if (location.pathname !== window.location.pathname) return;
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutDirectData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
    });

    workerInstance.generateLineChartData(JSON.stringify({
      popsData, maxDate, minDate,
    })).then(({ lineData, percentageData }) => {
      if (location.pathname !== window.location.pathname) return;
      setPercentagePopsKpisData(percentageData);
      setChartData((prev) => ({
        ...prev,
        lineData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
    });

    workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
      profileData: !isSelected ? profilesData.map(({
        id, name, image, activeProfile, imageBusiness,
      }) => ({
        id, name, image, activeProfile, imageBusiness,
      })) : profilesData.map(({
        id, name, image, activeProfile, imageBusiness,
      }) => ({
        id, name, image, activeProfile, imageBusiness,
      })).filter((el) => selectedProfiles.includes(Number(el.id))),
      popsData,
      minDate,
      maxDate,
      linkTaps,
      viewsKpis: viewsBottom,
    })).then((dohnutPopsByProfileData) => {
      if (location.pathname !== window.location.pathname) return;
      setChartData((prev) => ({
        ...prev,
        dohnutPopsByProfileData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: true, minDate, maxDate, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
    })).then((dohnutPopsData) => {
      if (location.pathname !== window.location.pathname) return;
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutPopsData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
    });
  };

  const generateData = (dateFromRange, dateFrom, dateTo, maxD, minD) => {
    // running preloaser for charts
    setIsChartDataCalculating({
      lineChart: true,
      dohnutDirectData: true,
      dohnutPopsData: true,
      dohnutPopsByProfileData: true,
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: false, minDate: dateFrom, maxDate: dateTo, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
    })).then((dohnutDirectData) => {
      if (location.pathname !== window.location.pathname) return;
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutDirectData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
    });

    workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
      profileData: !isSelected ? profilesData.map(({
        id, name, image, activeProfile, imageBusiness,
      }) => ({
        id, name, image, activeProfile, imageBusiness,
      })) : profilesData.map(({
        id, name, image, activeProfile, imageBusiness,
      }) => ({
        id, name, image, activeProfile, imageBusiness,
      })).filter((el) => selectedProfiles.includes(Number(el.id))),
      popsData,
      minDate: dateFrom,
      maxDate: dateTo,
      linkTaps,
      viewsKpis: viewsBottom,
    })).then((dohnutPopsByProfileData) => {
      if (location.pathname !== window.location.pathname) return;
      setChartData((prev) => ({
        ...prev,
        dohnutPopsByProfileData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
    });

    workerInstance.generateLineChartData(JSON.stringify({
      popsData, minDate: dateFrom, maxDate: dateTo,
    })).then(({ lineData, percentageData }) => {
      if (location.pathname !== window.location.pathname) return;
      setPercentagePopsKpisData(percentageData);
      setChartData((prev) => ({
        ...prev,
        lineData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
    });

    workerInstance.generateDohnutChartData(JSON.stringify({
      popsData, isPopsData: true, minDate: dateFrom, maxDate: dateTo, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
    })).then((dohnutPopsData) => {
      if (location.pathname !== window.location.pathname) return;
      setChartData((prev) => ({
        ...prev,
        dataType: "",
        dohnutPopsData,
      }));
      // stopping preloader
      setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
    });
    return setCalendar({
      ...calendar,
      dateRange: [dateTo, dateFromRange],
      normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
      visible: false,
    });
  };

  const handleShowAllStat = () => {
    setFilterValue("");
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
      dohnutPopsByProfileData: null,
    });
    setPopsData(null);
    setSaveSelected(true);
  };

  const selectOption = (event) => {
    setOption(event.target.value);
    setCalendar({ ...calendar, visible: false });

    switch (event.target.value) {
    case "all time": {
      setIsAllTime(true);
      // running preloaser for charts
      setIsChartDataCalculating({
        lineChart: true,
        dohnutDirectData: true,
        dohnutPopsData: true,
        dohnutPopsByProfileData: true,
      });
      workerInstance.generateAllData(JSON.stringify({ popsData, isSafari })).then((result) => {
        if (location.pathname !== window.location.pathname) return;
        const { data, maxDate, minDate } = JSON.parse(result);
        let minD;
        let maxD;
        if (isSafari) {
          minD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
            maxDate,
          )}, ${getYear(maxDate)}-`;
          maxD = `${monthsFullName[getMonth(minDate)]} ${getDay(
            minDate,
          )}, ${getYear(minDate)}`;
        } else {
          minD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
            maxDate,
          )}, ${getYear(maxDate)}-`;
          maxD = `${monthsFullName[getMonth(minDate)]} ${getDay(
            minDate,
          )}, ${getYear(minDate)}`;
        }

        setChartData((prev) => ({
          ...prev,
          lineData: data,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
        setCalendar({
          ...calendar,
          dateRange: [new Date(maxDate), new Date(minDate)],
          normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
          visible: false,
        });
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: false, minDate: null, maxDate: null, isAllData: true, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
      })).then((dohnutDirectData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutDirectData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
      });

      workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
        profileData: !isSelected ? profilesData.map(({
          id, name, image, activeProfile, imageBusiness,
        }) => ({
          id, name, image, activeProfile, imageBusiness,
        })) : profilesData.map(({
          id, name, image, activeProfile, imageBusiness,
        }) => ({
          id, name, image, activeProfile, imageBusiness,
        })).filter((el) => selectedProfiles.includes(Number(el.id))),
        popsData,
        minDate: null,
        maxDate: null,
        isAllData: true,
        linkTaps,
        viewsKpis: viewsBottom,
      })).then((dohnutPopsByProfileData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dohnutPopsByProfileData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
      });

      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData, isPopsData: true, minDate: null, maxDate: null, isAllData: true, profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
      })).then((dohnutPopsData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutPopsData,
        }));
        // stopping preloader
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
      });

      return;
    }
    case "last 7 days": {
      setIsAllTime(false);
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(6, "d").toDate();
      const dateFromRange = moment().subtract(7, "d").toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    case "month to date": {
      setIsAllTime(false);
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(1, "months").endOf("month").subtract(-1, "d")
        .toDate();
      const dateFromRange = moment().subtract(1, "months").endOf("month").toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    case "last 30 days": {
      setIsAllTime(false);
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(1, "months").subtract(-1, "d").toDate();
      const dateFromRange = moment().subtract(1, "months").toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    case "week to date": {
      setIsAllTime(false);
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(1, "weeks").endOf("isoWeek").subtract(-1, "d")
        .toDate();
      const dateFromRange = moment().subtract(1, "weeks").endOf("isoWeek")
        .toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    default: {
      // setIsAllTime(false);
      const dateTo = moment().toDate();
      const dateFrom = moment().subtract(2, "weeks").subtract(-1, "d")
        .toDate();
      const dateFromRange = moment().subtract(2, "weeks")
        .toDate();
      let minD = `${monthsFullName[getMonth(dateTo)]} ${getDay(
        dateTo,
      )}, ${getYear(dateTo)}-`;
      let maxD = `${monthsFullName[getMonth(dateFrom)]} ${getDay(
        dateFrom,
      )}, ${getYear(dateFrom)}`;
      return generateData(dateFromRange, dateFrom, dateTo, maxD, minD);
    }
    }
  };

  useEffect(() => {
    if (profilesData) {
      dispatch(mainAnalyticsAction());
    }
  }, [profilesData]);

  // SETTING ALL POPS
  useEffect(() => {
    if (allPopsData) {
      // setting pops for popl level
      if (location.state?.poplName) {
        dispatch(setCheckboxAction({ id: String(location.state.poplName), checked: true }, location.state.from));
        workerInstance.overallAnalyticsPopsPoplLevel(JSON.stringify({ allPopsData, location }))
          .then(({ poplPops, qrCodePops, walletPops }) => {
            if (location.pathname !== window.location.pathname) return;
            setPopsData({
              poplPops, qrCodePops: [...qrCodePops, ...walletPops], allPops: [...poplPops, ...qrCodePops, ...walletPops],
            });
          });
      }
      // setting popps for individual profile level
      else if (location.state?.id) {
        dispatch(setCheckboxAction({ id: String(location.state.id), checked: true }, location.state.from));
        return setPopsData({
          poplPops: allPopsData.poplPops.filter((pop) => pop[0] == location.state.id),
          qrCodePops: [...allPopsData.qrCodePops.filter((pop) => pop[0] == location.state.id), ...allPopsData.walletPops.filter((pop) => pop[0] == location.state.id)],
          allPops: allPopsData.allPops.filter((pop) => pop[0] == location.state.id),
        });
      } else {
        setPopsData({
          poplPops: allPopsData.poplPops,
          qrCodePops: [...allPopsData.qrCodePops, ...allPopsData.walletPops],
          allPops: allPopsData.allPops,
        });
      }
    }
  }, [allPopsData, location]);

  useEffect(() => {
    if (!Object.keys(checkboxes.profiles).length) setPopsLineData(null);
    if (popsData && profileCountFilter && profilesData && Object.keys(checkboxes.profiles).length) {
      // running preloaser for charts
      setIsChartDataCalculating((prev) => ({ ...prev, lineChart: true }));
      workerInstance.profileLineDataChart(JSON.stringify({
        popsData, profilesData, minDate: calendar.dateRange[0], maxDate: calendar.dateRange[1],
      })).then((res) => {
        if (location.pathname !== window.location.pathname) return;
        setPopsLineData({ ...res, data: res.data.filter((prof) => selectedProfiles.includes(Number(prof.id))), isProfile: true });
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
      });
    }
  }, [checkboxes.profiles, calendar.dateRange, profilesData, popsData]);

  useEffect(() => {
    const isSelected = Object.values(checkboxes.devices).includes(true);
    if (isSelected) {
      const selectedDevices = Object.keys(checkboxes.devices).filter((el) => checkboxes.devices[el]);
      workerInstance.overallAnalyticsPopsPoplLevel(JSON.stringify({ allPopsData, location, selectedDevices }))
        .then(({ poplPops, qrCodePops, walletPops }) => {
          if (location.pathname !== window.location.pathname) return;
          setPopsDeviceData({
            poplPops, qrCodePops: [...qrCodePops, ...walletPops], allPops: [...poplPops, ...qrCodePops, ...walletPops],
          });
        });
    } else if (allPopsData && popsData) {
      setPopsData({
        poplPops: allPopsData.poplPops,
        qrCodePops: [...allPopsData.qrCodePops, ...allPopsData.walletPops],
        allPops: allPopsData.allPops,
      });
      setDeviceLineData(null);
    }
  }, [checkboxes.devices]);

  useEffect(() => {
    const isSelected = Object.values(checkboxes.devices).includes(true);
    if (popsDeviceData && isSelected) {
      workerInstance.generateDeviceData(JSON.stringify({ popsData: popsDeviceData, minDate: calendar.dateRange[0], maxDate: calendar.dateRange[1] })).then(({ lineData, percentageData }) => {
        setDeviceLineData((prev) => ({
          ...prev,
          lineData,
        }));
      });
    }
  }, [popsDeviceData, calendar.dateRange]);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      if (saveSelected) {
        setSaveSelected(false);
        return selectOption({ target: { value: options } });
      }

      // running preloaser for charts
      setIsChartDataCalculating({
        lineChart: true,
        dohnutDirectData: true,
        dohnutPopsData: true,
        dohnutPopsByProfileData: true,
      });
      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData,
        isPopsData: true,
        profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
        minDate: calendar.dateRange[0],
        maxDate: calendar.dateRange[1],
      })).then((dohnutPopsData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dataType: "",
          dohnutPopsData,
        }));
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsData: false }));
      });
      workerInstance.generateDohnutPopsByProfileData(JSON.stringify({
        profileData: !isSelected ? profilesData.map(({
          id, name, image, activeProfile, imageBusiness,
        }) => ({
          id, name, image, activeProfile, imageBusiness,
        })) : profilesData.map(({
          id, name, image, activeProfile, imageBusiness,
        }) => ({
          id, name, image, activeProfile, imageBusiness,
        })).filter((el) => selectedProfiles.includes(Number(el.id))),
        popsData,
        linkTaps,
        viewsKpis: viewsBottom,
        minDate: calendar.dateRange[0],
        maxDate: calendar.dateRange[1],
      })).then((dohnutPopsByProfileData) => {
        if (location.pathname !== window.location.pathname) return;
        setChartData((prev) => ({
          ...prev,
          dohnutPopsByProfileData,
        }));
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, dohnutPopsByProfileData: false }));
      });
      workerInstance.generateLineChartData(JSON.stringify({
        popsData, minDate: calendar.dateRange[0], maxDate: calendar.dateRange[1],
      })).then(({ lineData, percentageData }) => {
        if (location.pathname !== window.location.pathname) return;
        setPercentagePopsKpisData(percentageData);
        setChartData((prev) => ({
          ...prev,
          lineData,
        }));
        // stopping preloaser for charts
        setIsChartDataCalculating((prev) => ({ ...prev, lineChart: false }));
      });
      workerInstance.generateDohnutChartData(JSON.stringify({
        popsData,
        isPopsData: false,
        profileData: isSelected ? profilesData.filter(({ id }) => selectedProfiles.includes(Number(id))) : profilesData,
        minDate: calendar.dateRange[0],
        maxDate: calendar.dateRange[1],
      }))
        .then((dohnutDirectData) => {
          if (location.pathname !== window.location.pathname) return;
          setChartData((prev) => ({
            ...prev,
            dataType: "",
            dohnutDirectData,
          }));
          // stopping preloaser for charts
          setIsChartDataCalculating((prev) => ({ ...prev, dohnutDirectData: false }));
        });
    } else if (chartData.lineData) {
      setChartData({
        dohnutDirectData: null,
        dohnutPopsData: null,
        lineData: null,
        dohnutPopsByProfileData: null,
      });
    }
  }, [popsData, location, checkboxes.profiles]);

  useEffect(() => {
    if (viewsBottom) {
      if (location.state?.id) {
        return setViewsKpis(viewsBottom.filter((view) => view[0] == location.state.id));
      }
      setViewsKpis(viewsBottom);
    }
  }, [location, viewsBottom]);

  useEffect(() => () => dispatch(clearChecboxAction()), []);

  const getPopsData = () => {
    if (deviceLineData?.lineData) return deviceLineData.lineData;
    if (popsLineData?.data?.length) return popsLineData;
    return chartData?.lineData;
  };

  const getActiveIteTitle = () => {
    if (deviceLineData?.lineData) return "device";
    if (popsLineData?.data?.length) return "account";
    return true;
  };

  return (
    <>
      <Header
        rootLink="Analytics"
      />
      <div className={classes.contentRoot}>
        <div className={classes.overallAnalyticsContainer}>
          <NetworkActivity
            data={getPopsData()}
            dataType={chartData?.dataType}
            calendar={calendar}
            setCalendar={setCalendar}
            setDate={setDate}
            views={viewsKpis}
            poplLevel={!!location.state?.poplName}
            profileLevelId={location.state?.id}
            options={options}
            selectOption={selectOption}
            profilesData={profilesData}
            handleShowAllStat={handleShowAllStat}
            profileCountFilter={profileCountFilter}
            setProfileCountFilter={setProfileCountFilter}
            isChartsDataCalculating={isChartsDataCalculating.lineChart}
            profilCheckboxes={checkboxes.profiles}
            deviceCheckboxes={checkboxes.devices}
            checkboxes={isSelected ? checkboxes.profiles : checkboxes.devices}
            activeItemTitle={getActiveIteTitle()}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            popsPercentageData={percentagePopsKpisData}
            isAllTimeData={isAllTime}
            devices={devices}
            handleRefresh={handleRefresh}
          />
        </div>
        <BottomWidgets
          userId={userId}
          calendar={calendar}
          dohnutPopsData={chartData?.dohnutPopsData}
          dohnutDirectData={chartData?.dohnutDirectData}
          dohnutPopsByProfileData={chartData?.dohnutPopsByProfileData}
          profilesData={profilesData}
          isChartsDataCalculating={isChartsDataCalculating}
          isPoplLevel={location.state?.poplName || getActiveIteTitle() === "device"}
        />
      </div>
    </>
  );
}

export default OverallAnalytics;

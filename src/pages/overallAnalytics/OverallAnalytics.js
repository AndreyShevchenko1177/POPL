import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import NetworkActivity from "./components/timeLine";
import {
  cleanAction, mainAnalyticsAction,
} from "./store/actions";
import {
  generateLineChartData, generateDohnutPopsByProfileData, generateDohnutChartData, getYear, getMonth, getDay, monthsFullName, generateAllData, filterPops,
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
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const allPopsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPopsNew.data,
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

  const setDate = (minDate, maxDate) => {
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
    if (maxDateMilis < minDateMilis) {
      setChartData({
        ...chartData,
        lineData: generateLineChartData(popsData, maxDate, minDate),
        dataType: "",
        dohnutPopsData: generateDohnutChartData(popsData, true, minDate, maxDate),
        dohnutDirectData: generateDohnutChartData(popsData, false, minDate, maxDate),
        dohnutPopsByProfileData: generateDohnutPopsByProfileData(profilesData.map(({ id, name }) => ({ id, name })), popsData, minDate, maxDate),

      });
      return setCalendar({
        ...calendar,
        dateRange: [maxDate, minDate],
        normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
        visible: false,
      });
    }
    // console.log({
    //   minDate, maxDate, minD, maxD,
    // }, "set date function, component - overallanalytics");
    setCalendar({
      ...calendar,
      dateRange: [minDate, maxDate],
      normalData: [minD, maxD],
      visible: false,
    });
    setChartData({
      ...chartData,
      lineData: generateLineChartData(popsData, minDate, maxDate),
      dataType: "",
      dohnutPopsData: generateDohnutChartData(popsData, true, minDate, maxDate),
      dohnutDirectData: generateDohnutChartData(popsData, false, minDate, maxDate),
      dohnutPopsByProfileData: generateDohnutPopsByProfileData(profilesData.map(({ id, name }) => ({ id, name })), popsData, minDate, maxDate),
    });
  };

  const generateData = (dateFromRange, dateFrom, dateTo, maxD, minD) => {
    // console.log({
    //   dateFromRange, dateFrom, dateTo, maxD, minD,
    // }, "generate data, component - overallanalytics");
    setChartData({
      ...chartData,
      lineData: generateLineChartData(popsData, dateFrom, dateTo),
      dataType: "",
      dohnutPopsData: generateDohnutChartData(popsData, true, dateFrom, dateTo),
      dohnutDirectData: generateDohnutChartData(popsData, false, dateFrom, dateTo),
      dohnutPopsByProfileData: generateDohnutPopsByProfileData(profilesData.map(({ id, name }) => ({ id, name })), popsData, dateFrom, dateTo),

    });
    return setCalendar({
      ...calendar,
      dateRange: [dateTo, dateFromRange],
      normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
      visible: false,
    });
  };

  const handleShowAllStat = () => {
    // dispatch(getStatisticItemsRequest(userId));
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
      dohnutPopsByProfileData: null,
    });
    // dispatch(cleanAction());
    setPopsData(null);
    setSaveSelected(true);
  };

  const selectOption = (event) => {
    setOption(event.target.value);
    setCalendar({ ...calendar, visible: false });
    switch (event.target.value) {
    case "all time": {
      const { data, maxDate, minDate } = generateAllData(popsData);
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

      setChartData({
        ...chartData,
        lineData: data,
        dohnutPopsData: generateDohnutChartData(popsData, true, null, null, true),
        dohnutDirectData: generateDohnutChartData(popsData, false, null, null, true),
        dohnutPopsByProfileData: generateDohnutPopsByProfileData(profilesData.map(({ id, name }) => ({ id, name })), popsData, null, null, true),
        dataType: "allData",
      });
      return setCalendar({
        ...calendar,
        dateRange: [maxDate, minDate],
        normalData: [`${maxD}-`, minD.slice(0, minD.length - 1)],
        visible: false,
      });
    }
    case "last 7 days": {
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
      setTimeout(() => {
        // setting pops for popl level
        if (location.state?.poplName) {
          const poplPops = [];
          const qrCodePops = [];
          const walletPops = [];
          const filteredPops = allPopsData.allPops.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === location.state.poplName);
          filteredPops.forEach((pop) => {
            if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
            if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
            if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
          });
          return setPopsData({
            poplPops, qrCodePops: [...qrCodePops, ...walletPops], allPops: [...poplPops, ...qrCodePops, ...walletPops],
          });
        }
        // setting popps for individual profile level
        if (location.state?.id) {
          return setPopsData({
            poplPops: allPopsData.poplPops.filter((pop) => pop[0] == location.state.id),
            qrCodePops: [...allPopsData.qrCodePops.filter((pop) => pop[0] == location.state.id), ...allPopsData.walletPops.filter((pop) => pop[0] == location.state.id)],
            allPops: allPopsData.allPops.filter((pop) => pop[0] == location.state.id),
          });
        }
        setPopsData({
          poplPops: allPopsData.poplPops,
          qrCodePops: [...allPopsData.qrCodePops, ...allPopsData.walletPops],
          allPops: allPopsData.allPops,
        });
      }, 0);
    }
  }, [allPopsData, location]);

  // console.log(popsData, chartData);

  useEffect(() => () => {
    dispatch(cleanAction());
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
      dohnutPopsByProfileData: null,
    });
  }, []);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      if (saveSelected) {
        setSaveSelected(false);
        return selectOption({ target: { value: options } });
      }
      setChartData({
        lineData: generateLineChartData(popsData),
        dohnutPopsData: generateDohnutChartData(popsData, true),
        dohnutDirectData: generateDohnutChartData(popsData),
        dohnutPopsByProfileData: generateDohnutPopsByProfileData(profilesData.map(({ id, name }) => ({ id, name })), popsData),
      });
    } else if (chartData.lineData) {
      setChartData({
        dohnutDirectData: null,
        dohnutPopsData: null,
        lineData: null,
        dohnutPopsByProfileData: null,
      });
    }
  }, [popsData, location]);

  useEffect(() => {
    if (viewsBottom) {
      if (location.state?.id) {
        return setViewsKpis(viewsBottom.filter((view) => view[0] == location.state.id));
      }
      setViewsKpis(viewsBottom);
    }
  }, [location, viewsBottom]);

  return (
    <>
      <Header
        rootLink="Analytics"
        rootLinkClick={handleShowAllStat}
        lastChild={location.state?.name || location.state?.poplName}
        firstChild={location.state?.id ? "Accounts" : location.state?.name ? "Popls" : ""}
        firstChildRedirectPath={location.state?.id ? "/accounts" : "/popls"}
        path="/analytics"
      />
      <div className={classes.contentRoot}>
        <div className={classes.overallAnalyticsContainer}>
          <NetworkActivity
            data={chartData?.lineData}
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
          />
        </div>
        <BottomWidgets
          userId={userId}
          calendar={calendar}
          dohnutPopsData={chartData?.dohnutPopsData}
          dohnutDirectData={chartData?.dohnutDirectData}
          dohnutPopsByProfileData={chartData?.dohnutPopsByProfileData}
          profilesData={profilesData}
        />
      </div>

    </>
  );
}

export default OverallAnalytics;

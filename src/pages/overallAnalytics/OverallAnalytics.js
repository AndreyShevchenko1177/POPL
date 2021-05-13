import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import {
  getPopsAction, cleanAction, getStatisticItem, getStatisticItemsRequest,
} from "./store/actions";
import {
  generateLineChartData, generateDohnutChartData, getYear, getMonth, getDay, monthsFullName, deepLinkCopy, generateAllData,
} from "../../utils";
import Header from "../../components/Header";
import useStyles from "./styles";
import BottomWidgets from "./components/widgets";

function OverallAnalytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const [options, setOption] = useState("");
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const {
    popsCountTop, totalPopls, topViewedProfiles,
  } = useSelector(({ realTimeAnalytics }) => realTimeAnalytics);
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const [widgetLayerString, setWidgetLayerString] = useState({ layer: "Total", name: "Total" });
  const [chartData, setChartData] = useState({
    dohnutDirectData: null,
    dohnutPopsData: null,
    lineData: null,
  });
  const [saveSelected, setSaveSelected] = useState(false);

  const minTimestamp = new Date().getTime() - (86400000 * 13);
  const currentDate1 = `${monthsFullName[getMonth(minTimestamp)]} ${getDay(minTimestamp)}, ${getYear(minTimestamp)}-`;
  const currentDate2 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  )}, ${getYear(new Date())}`;
  const [calendar, setCalendar] = useState({
    visible: false,
    dateRange: [new Date(currentDate1), new Date(currentDate2)],
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
        ...chartData, lineData: generateLineChartData(popsData, maxDate, minDate), dataType: "", dohnutPopsData: generateDohnutChartData(popsData, true, minDate, maxDate), dohnutDirectData: generateDohnutChartData(popsData, false, minDate, maxDate),
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
      ...chartData, lineData: generateLineChartData(popsData, minDate, maxDate), dataType: "", dohnutPopsData: generateDohnutChartData(popsData, true, minDate, maxDate), dohnutDirectData: generateDohnutChartData(popsData, false, minDate, maxDate),
    });
  };

  const generateData = (dateFromRange, dateFrom, dateTo, maxD, minD) => {
    console.log({
      dateFromRange, dateFrom, dateTo, maxD, minD,
    }, "generate data, component - overallanalytics");
    setChartData({
      ...chartData, lineData: generateLineChartData(popsData, dateFrom, dateTo), dataType: "", dohnutPopsData: generateDohnutChartData(popsData, true, dateFrom, dateTo), dohnutDirectData: generateDohnutChartData(popsData, false, dateFrom, dateTo),
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
    });
    dispatch(cleanAction());
    setSaveSelected(true);
  };

  const selectOption = (event) => {
    setOption(event.target.value);
    switch (event.target.value) {
    case "all time": {
      const { data, maxDate, minDate } = generateAllData(popsData);
      let minD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
        maxDate,
      )}, ${getYear(maxDate)}-`;
      let maxD = `${monthsFullName[getMonth(minDate)]} ${getDay(
        minDate,
      )}, ${getYear(minDate)}`;
      setChartData({
        ...chartData, lineData: data, dohnutPopsData: generateDohnutChartData(popsData, true, null, null, true), dohnutDirectData: generateDohnutChartData(popsData, false, null, null, true), dataType: "allData",
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
      if (location.state?.poplName) {
        setWidgetLayerString({ layer: "Popl", name: location.state.poplName });
        dispatch(getPopsAction(null, location.state?.poplName));
      } else if (location.state?.id) {
        setWidgetLayerString({ layer: "Profile", name: location.state.name });
        dispatch(getStatisticItem([location.state], "single"));
        dispatch(getPopsAction(location.state?.id));
      } else {
        setWidgetLayerString({ layer: "Total", name: "Total" });
        dispatch(getStatisticItemsRequest(userId));

        if (!popsData || !Object.values(popsData).length) {
          dispatch(getPopsAction(location.state?.id));
        }
      }
    }
  }, [location, profilesData]);

  useEffect(() => () => {
    dispatch(cleanAction());
    setChartData({
      dohnutDirectData: null,
      dohnutPopsData: null,
      lineData: null,
    });
  }, []);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      if (saveSelected) {
        setSaveSelected(false);
        return selectOption({ target: { value: options } });
      }
      setChartData({ lineData: generateLineChartData(popsData), dohnutPopsData: generateDohnutChartData(popsData, true), dohnutDirectData: generateDohnutChartData(popsData) });
    } else {
      setChartData({
        dohnutDirectData: null,
        dohnutPopsData: null,
        lineData: null,
      });
    }
  }, [popsData, location]);

  return (
    <>
      <Header
        rootLink="Analytics"
        rootLinkClick={handleShowAllStat}
        lastChild={location.state?.name || location.state?.poplName}
        firstChild={location.state?.id ? "Profiles" : location.state?.name ? "Popls" : ""}
        firstChildRedirectPath={location.state?.id ? "/profiles" : "/popls"}
        path="/analytics"
      />
      <div className={classes.overallAnalyticsContainer}>
        {/* <TopStatistics
          popsCount={popsCountTop.data?.length}
          linkTaps={linkTapsTop.data}
          totalProfiles={location.state?.poplName ? "" : profilesData?.length}
          ctr={linkTapsTop.data && viewsTop.data
            ? `${((linkTapsTop.data / viewsTop.data) * 100).toFixed(1)}`
            : ""}
          totalPopls={location.state?.poplName ? "" : totalPopls.data?.length}
          views={viewsTop.data}
          isFetched={{
            linkTaps: linkTapsTop.isFetching,
            views: viewsTop.isFetching,
            popsCount: popsCountTop.isFetching,
            totalProfiles: profilesFetching,
            totalPopls: totalPopls.isFetching,
            ctr: linkTapsTop.isFetching || viewsTop.isFetching,
          }}
        /> */}
        <NetworkActivity
          data={chartData?.lineData}
          dataType={chartData?.dataType}
          calendar={calendar}
          setCalendar={setCalendar}
          setDate={setDate}
          options={options}
          selectOption={selectOption}
        />
      </div>
      <BottomWidgets
        totalPopls={totalPopls.data}
        totalPops={popsCountTop.data}
        userId={userId}
        widgetLayerString={widgetLayerString}
        views={topViewedProfiles.data}
        dohnutData={{ dohnutPopsData: chartData?.dohnutPopsData, dohnutDirectData: chartData?.dohnutDirectData }}
      />
    </>
  );
}

export default OverallAnalytics;

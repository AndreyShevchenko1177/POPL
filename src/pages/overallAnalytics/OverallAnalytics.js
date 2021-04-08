import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import {
  getPopsAction, cleanAction, getStatisticItem, getStatisticItemsRequest,
} from "./store/actions";
import {
  generateLineChartData, generateDohnutChartData, getYear, getMonth, getDay, monthsFullName,
} from "../../utils";
import Header from "../../components/Header";
import useStyles from "./styles";
import BottomWidgets from "./components/widgets";

function OverallAnalytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const topStatisticsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.topStatisticsData,
  );
  const [chartData, setChartData] = useState(null);
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
    const minD = `${monthsFullName[getMonth(minDate)]} ${getDay(
      minDate,
    )}, ${getYear(minDate)}-`;
    const maxD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
      maxDate,
    )}, ${getYear(maxDate)}`;
    const maxDateMilis = maxDate.setHours(0, 0, 0, 0);
    const minDateMilis = minDate.setHours(0, 0, 0, 0);
    if (maxDateMilis < minDateMilis) {
      console.log("maxDateMilis < minDateMilis", minDate, maxDate);
      setChartData({ lineData: generateLineChartData(popsData, minDate, maxDate), dohnutData: generateDohnutChartData(popsData, minDate, maxDate) });
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
    console.log("", minDate, maxDate);
    setChartData({ lineData: generateLineChartData(popsData, minDate, maxDate), dohnutData: generateDohnutChartData(popsData, minDate, maxDate) });
  };

  const handleShowAllStat = () => {
    dispatch(getStatisticItemsRequest(userId));
    dispatch(getPopsAction());
  };

  useEffect(() => {
    if (location.state?.poplName) {
      dispatch(getPopsAction(null, location.state?.poplName));
    } else if (location.state?.id) {
      dispatch(getStatisticItem(location.state));
      dispatch(getPopsAction(location.state?.id));
    } else {
      dispatch(getStatisticItemsRequest(userId));
      dispatch(getPopsAction(location.state?.id));
    }
  }, [location]);

  useEffect(() => () => {
    dispatch(cleanAction());
    setChartData(null);
  }, []);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      setChartData({ lineData: generateLineChartData(popsData), dohnutData: generateDohnutChartData(popsData) });
    } else {
      setChartData(popsData);
    }
  }, [popsData]);

  return (
    <>
      <Header
        rootLink="Analytics"
        rootLinkClick={handleShowAllStat}
        lastChild={location.state?.name || location.state?.poplName}
        firstChild={location.state?.name ? "Profiles" : location.state?.poplName ? "Popls" : ""}
        firstChildRedirectPath={location.state?.poplName ? "/popls" : "/profiles"}
        path="/analytics"
      />
      <div className={classes.overallAnalyticsContainer}>
        <TopStatistics
          popsCount={topStatisticsData.data?.popsCount}
          linkTaps={topStatisticsData.data?.linkTaps}
          totalProfiles={topStatisticsData.data?.totalProfiles}
          totalPopls={topStatisticsData.data?.totalPopls}
          views={topStatisticsData.data?.views}
          isFetched={topStatisticsData.isFetched}
        />
        <NetworkActivity data={chartData?.lineData} calendar={calendar} setCalendar={setCalendar} setDate={setDate}/>
      </div>
      <BottomWidgets
        topPopped={topStatisticsData.data?.topPoppedPopls}
        userId={userId}
        views={topStatisticsData.data?.topViewedProfiles}
        popsData={chartData?.lineData}
        dohnutData={chartData?.dohnutData}
      />
    </>
  );
}

export default OverallAnalytics;

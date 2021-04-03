import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import {
  getPopsAction, cleanAction, getStatisticItem, getStatisticItemsRequest, individualPopsCountAction,
} from "./store/actions";
import "./styles/styles.css";
import {
  generateChartData, getYear, getMonth, getDay, monthsFullName,
} from "../../utils";
import Header from "../../components/Header";

function OverallAnalytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const topStatisticsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.topStatisticsData,
  );
  const isFetching = useSelector(({ realTimeAnalytics }) => realTimeAnalytics.isFetching);
  const [chartData, setChartData] = useState();
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
      setChartData(generateChartData(popsData, maxDate, minDate));
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
    setChartData(generateChartData(popsData, minDate, maxDate));
  };

  const handleShowAllStat = () => {
    dispatch(getStatisticItemsRequest(userId));
    dispatch(getPopsAction());
  };

  useEffect(() => {
    // if (location.state?.poplId) dispatch(getStatisticItem(location.state));

    if (location.state?.poplName) {
      dispatch(getPopsAction(null, location.state?.poplName));
    } else if (location.state?.id) {
      dispatch(getStatisticItem(location.state));
      dispatch(getPopsAction(location.state?.id));
    } else {
      dispatch(getStatisticItemsRequest(userId));
      dispatch(getPopsAction(location.state?.id));
    }
    return () => {
      dispatch(cleanAction());
    };
  }, []);

  useEffect(() => {
    if (popsData?.length) {
      setChartData(generateChartData(popsData));
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
        path="/analytics/overall"
      />
      <div className="overall-analytics-container">
        <TopStatistics
          popsCount={topStatisticsData.data?.popsCount}
          linkTaps={topStatisticsData.data?.linkTaps}
          totalProfiles={topStatisticsData.data?.totalProfiles}
          totalPopls={topStatisticsData.data?.totalPopls}
          views={topStatisticsData.data?.views}
          isFetched={topStatisticsData.isFetched}
        />{" "}
        {/* add linkTaps, totalViews here */}
        <NetworkActivity data={chartData} calendar={calendar} setCalendar={setCalendar} setDate={setDate}/>
      </div>
    </>
  );
}

export default OverallAnalytics;

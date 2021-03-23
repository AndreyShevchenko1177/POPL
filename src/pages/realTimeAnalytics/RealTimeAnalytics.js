import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import { getPopsAction } from "./store/actions";
import { getProfilesIds } from "../profiles/store/actions";
import "./styles/styles.css";
import {
  generateChartData, getYear, getMonth, getDay, monthsFullName,
} from "../../utils";
import Header from "../../components/Header";

function RealTimeAnalytics() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: userId, name } = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const topStatisticsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.topStatisticsData,
  );
  const [chartData, setChartData] = useState();
  const currentDate1 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  )}, ${getYear(new Date())}-`;
  const currentDate2 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  )}, ${getYear(new Date())}`;
  const [calendar, setCalendar] = useState({
    visible: false,
    dateRange: [new Date(), new Date()],
    normalData: [currentDate1, currentDate2],
  });

  const setDate = (minDate, maxDate) => {
    const minD = `${monthsFullName[getMonth(minDate)]} ${getDay(
      minDate,
    )}, ${getYear(minDate)}-`;
    const maxD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
      maxDate,
    )}, ${getYear(maxDate)}`;
    setCalendar({
      ...calendar,
      dateRange: [minDate, maxDate],
      normalData: [minD, maxD],
      visible: false,
    });
    setChartData(generateChartData(popsData, { minDate, maxDate }));
  };

  useEffect(() => {
    dispatch(getProfilesIds(userId));
    if (!popsData) {
      dispatch(getPopsAction(4822));
    }
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
        lastChild={location.state?.name}
        firstChild='Overall'
        path="/profiles"
      />
      {console.log(chartData)}
      <div className="real-time-analytics-container">
        <TopStatistics
          popsCount={topStatisticsData.data?.popsCount}
          linkTaps={topStatisticsData.data?.linkTaps}
          totalProfiles={topStatisticsData.data?.totalProfiles}
          totalPopls={topStatisticsData.data?.totalPopls}
          isFetched={topStatisticsData.isFetched}
        />{" "}
        {/* add linkTaps, totalViews here */}
        <NetworkActivity data={chartData} calendar={calendar} setCalendar={setCalendar} setDate={setDate}/>
      </div>
    </>
  );
}

export default RealTimeAnalytics;

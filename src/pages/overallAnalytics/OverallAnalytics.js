import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import { getPopsAction, cleanAction } from "./store/actions";
import { getProfilesIds } from "../profiles/store/actions";
import "./styles/styles.css";
import {
  generateChartData, getYear, getMonth, getDay, monthsFullName, normalizeDate,
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
  const [chartData, setChartData] = useState();
  const currentDate1 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  ) - 13}, ${getYear(new Date())}-`;
  const currentDate2 = `${monthsFullName[getMonth(new Date())]} ${getDay(
    new Date(),
  )}, ${getYear(new Date())}`;
  const [calendar, setCalendar] = useState({
    visible: false,
    dateRange: [new Date(currentDate1), new Date(currentDate2)],
    normalData: [currentDate1, currentDate2],
  });

  const setDate = (minDate, maxDate) => {
    const [_maxdY, _maxdM, _maxdD] = `${getYear(maxDate)}-${normalizeDate(getMonth(maxDate) + 1)}-${normalizeDate(getDay(maxDate))}`.split("-");
    const [_mindY, _mindM, _mindD] = `${getYear(minDate)}-${normalizeDate(getMonth(minDate) + 1)}-${normalizeDate(getDay(minDate))}`.split("-");
    const minD = `${monthsFullName[getMonth(minDate)]} ${getDay(
      minDate,
    )}, ${getYear(minDate)}-`;
    const maxD = `${monthsFullName[getMonth(maxDate)]} ${getDay(
      maxDate,
    )}, ${getYear(maxDate)}`;
    if (_maxdD < _mindD || _maxdM < _mindM || _maxdY < _mindY) {
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
    setChartData(generateChartData(popsData, minDate, maxDate));
  };

  useEffect(() => {
    dispatch(getProfilesIds(4822));

    if (!popsData) {
      dispatch(getPopsAction(location.state && location.state.id));
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
        lastChild={location.state?.name}
        firstChild='Overall'
        path="/profiles"
      />
      <div className="overall-analytics-container">
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

export default OverallAnalytics;

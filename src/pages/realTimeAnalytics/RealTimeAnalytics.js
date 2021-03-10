import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import { getPopsAction } from "./store/actions";
import { getProfilesIds } from "../profiles/store/actions";
import "./styles/styles.css";
import { generateChartData } from "../../utils";

function RealTimeAnalytics() {
  const dispatch = useDispatch();
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const topStatisticsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.topStatisticsData,
  );
  const [chartData, setChartData] = useState();

  useEffect(() => {
    dispatch(getProfilesIds(userId));
    if (!popsData) {
      dispatch(getPopsAction(userId));
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
    <div className="real-time-analytics-container">
      <TopStatistics
        popsCount={popsData?.length}
        linkTaps={topStatisticsData.data?.linkTaps}
        totalProfiles={topStatisticsData.data?.totalProfiles}
        totalPopls={topStatisticsData.data?.totalPopls}
        isFetched={topStatisticsData.isFetched}
      />{" "}
      {/* add linkTaps, totalViews here */}
      <NetworkActivity data={chartData} />
    </div>
  );
}

export default RealTimeAnalytics;

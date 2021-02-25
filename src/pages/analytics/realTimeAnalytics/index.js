import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import { getPopsAction } from "../store/actions";
import "./styles/styles.css";

function RealTimeAnalytics() {
  const dispatch = useDispatch();
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const popsData = useSelector(
    ({ analyticsReducer }) => analyticsReducer.allPops.data
  );
  const [chartData, setChartData] = useState();

  useEffect(() => {
    !Object.keys(popsData).length && dispatch(getPopsAction(userId));
  }, []);

  useEffect(() => {
    if (popsData.length) {
      const result = {};
      popsData.forEach((pop) => {
        const currentMonth = new Date().getMonth() + 1;
        if (currentMonth === Number(pop[2].split("-")[1])) {
          const date = pop[2].split(" ")[0];
          result[date] = (result[date] || 0) + 1;
        }
      });
      setChartData(result);
    }
  }, [popsData]);

  return (
    <div className="real-time-analytics-container">
      <TopStatistics popsCount={popsData.length} />
      <NetworkActivity data={chartData} />
    </div>
  );
}

export default RealTimeAnalytics;

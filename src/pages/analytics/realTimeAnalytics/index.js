import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/timeLine";
import { getPopsAction } from "../store/actions";
import "./styles/styles.css";
import { getYear, getMonth, getDay, normalizeDate } from "../../../utils/dates";

function RealTimeAnalytics() {
  const dispatch = useDispatch();
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const popsData = useSelector(
    ({ analyticsReducer }) => analyticsReducer.allPops.data
  );
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (!popsData) {
      dispatch(getPopsAction(userId));
    }
    // !Object.keys(popsData).length && dispatch(getPopsAction(userId));
  }, []);

  useEffect(() => {
    if (popsData?.length) {
      const result = {};
      const currentDate = new Date();
      const periodDate = new Date().setDate(currentDate.getDate() - 30);
      const [_cy, currentMonth, _cd] = `${getYear(currentDate)}-${normalizeDate(
        getMonth(currentDate) + 1
      )}-${normalizeDate(getDay(currentDate))}`.split("-");
      const [_py, periodMonth, periodDay] = `${getYear(
        periodDate
      )}-${normalizeDate(getMonth(periodDate) + 1)}-${normalizeDate(
        getDay(periodDate)
      )}`.split("-");
      popsData.forEach((pop) => {
        const [_ry, receiveMonth, receiveDay] = pop[2].split(" ")[0].split("-");
        if (currentMonth === receiveMonth) {
          const date = pop[2].split(" ")[0];
          result[date] = (result[date] || 0) + 1;
        } else if (
          Number(periodDay) <= Number(receiveDay) &&
          periodMonth === receiveMonth
        ) {
          const date = pop[2].split(" ")[0];
          result[date] = (result[date] || 0) + 1;
        }
      });
      setChartData(result);
    }
    setChartData(popsData);
  }, [popsData]);

  return (
    <div className="real-time-analytics-container">
      <TopStatistics popsCount={popsData?.length} />
      <NetworkActivity data={chartData} />
    </div>
  );
}

export default RealTimeAnalytics;

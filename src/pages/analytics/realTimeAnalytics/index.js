import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getPopsAction(userId));
  }, []);

  return (
    <div className="real-time-analytics-container">
      <TopStatistics popsCount={popsData.length} />
      <NetworkActivity popsCount={popsData.length} />
    </div>
  );
}

export default RealTimeAnalytics;

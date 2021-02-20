import React from "react";
import TopStatistics from "./components/topStatistics";
import NetworkActivity from "./components/networkActivity";
import "./styles/styles.css";

function RealTimeAnalytics() {
  return (
    <div className="real-time-analytics-container">
      <TopStatistics />
      <NetworkActivity />
    </div>
  );
}

export default RealTimeAnalytics;

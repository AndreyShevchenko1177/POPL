import React from "react";
import { Line } from "react-chartjs-2";
import mockData from "./mockData";

const chartOptions = {
  scales: {
    xAxes: [
      {
        type: "time",
      },
    ],
  },
  legend: {
    display: false,
  },
};

export default function Chart({ data }) {
  return (
    <div className="relative">
      <Line options={chartOptions} data={mockData.line} />
    </div>
  );
}

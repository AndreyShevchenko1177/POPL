import React from "react";
import { Line } from "react-chartjs-2";

export default function Chart({ data }) {
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import chartOptions from "./mockData";
import Loader from "../../../components/Loader";
import useStyles from "./styles/style";

export default function Chart({ data }) {
  const [chartData, setChartData] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      const result = [];
      Object.keys(data).forEach((key) => {
        result.push({ t: key, y: data[key] });
      });
      chartOptions.data.datasets[0].data = result;
      setChartData(chartOptions.data);
    }
  }, [data]);
  return (
    <div className={classes.chartContainer}>
      {chartData === undefined ? (
        <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <>
          <Line options={chartOptions.options} data={chartData} />
          {!chartData.length && (
            <div className={classes.noDataText}>No data for this period</div>
          )}
        </>
      )}
    </div>
  );
}

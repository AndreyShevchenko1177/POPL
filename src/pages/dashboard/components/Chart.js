import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import chartOptions from "./chartOptions";
import Loader from "../../../components/Loader";
import useStyles from "./styles/style";
import { getDay, getMonth, getMothName } from "../../../utils/dates";

export default function Chart({ data }) {
  const [chartData, setChartData] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      const result = [];
      const labels = [];
      Object.keys(data).forEach((key) => {
        result.push(data[key]);
        labels.push(`${getMothName(getMonth(key))} ${getDay(key)}`);
      });
      chartOptions.data.datasets[0].data = result;
      chartOptions.data.labels = labels;
      setChartData(chartOptions.data);
    }
  }, [data]);
  return (
    <div className={classes.chartContainer}>
      {chartData === undefined ? (
        <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <>
          {chartData?.datasets[0]?.data?.filter((v) => v).length ? <Line options={chartOptions.options} data={chartData} />
            : (
              <div className={classes.noDataText}>No data for this period</div>
            )}
        </>
      )}
    </div>
  );
}

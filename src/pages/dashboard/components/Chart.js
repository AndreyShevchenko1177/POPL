/* eslint-disable guard-for-in */
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
      const result = {};
      const labels = [];
      Object.keys(data).forEach((key, i) => {
        if (key === "labels") {
          data[key].forEach((el) => labels.push(`${getMothName(getMonth(el))} ${getDay(el)}`));
          return;
        }
        result[key] = Object.values(data[key]);
        chartOptions.data.datasets[i].data = [...Object.values(data[key])];
      });
      chartOptions.data.labels = labels;
      setChartData({
        data: { ...chartOptions.data },
        options: {
          ...chartOptions.options,
          scales: {
            ...chartOptions.scales,
            xAxes: [{ ...chartOptions.options.scales.xAxes[0], offset: result.length === 1 }],
            yAxes: [{
              afterTickToLabelConversion(q) {
                for (let tick in q.ticks) {
                  const part = q.ticks[tick].split(".");
                  if (part.length > 1) {
                    if (part[1] > 0 || q.ticks[tick] < 1) {
                      q.ticks[tick] = "";
                    } else {
                      q.ticks[tick] = Number(q.ticks[tick]).toFixed(0);
                    }
                  }
                }
                q.ticks[q.ticks.length - 1] = "0";
              },
            }],
          },
        },
      });
    }
  }, [data]);
  return (
    <div className={classes.chartContainer}>
      {chartData === undefined ? (
        <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <>
          {chartData?.data?.datasets[0]?.data?.filter((v) => v).length ? <Line options={chartData?.options} data={chartData?.data} />
            : (
              <div className={classes.noDataText}>No data for this period</div>
            )}
        </>
      )}
    </div>
  );
}

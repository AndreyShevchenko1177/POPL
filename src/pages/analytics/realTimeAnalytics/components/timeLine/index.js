import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import useStyles from "./styles/styles";
import DatePicker from "../../../../../components/DatePicker";
import chartOptions from "./chartOptions";
import Bar from "./bar";
import Loader from "../../../../../components/Loader";

const barData = [
  {
    title: "Facebook Campaign",
    value: 75,
  },
  {
    title: "Twitter Campaign",
    value: 60,
  },
  {
    title: "Conventional Media",
    value: 35,
  },
  {
    title: "Bill Boards",
    value: 40,
  },
];

export default function NetworkActivity({ data }) {
  const classes = useStyles();
  const [chartData, setChartData] = useState();
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
    <div className={classes["network-container"]}>
      <div className={classes["network-container__header"]}>
        <div className={classes["network-container__title"]}>
          <Typography variant="h5" className={classes.text}>
            Time line chart
          </Typography>
          <Typography variant="h6" className={classes.text}>
            SubTitle
          </Typography>
        </div>
        <div style={{ position: "relative" }}>
          <DatePicker />
        </div>
      </div>
      <div className={classes["network-container__charts"]}>
        <div className={classes["network-container__line"]}>
          {chartData === undefined ? (
            <Loader
              styles={{ position: "absolute", top: "50%", left: "50%" }}
            />
          ) : (
            <>
              <Line options={chartOptions.options} data={chartData} />
              {!chartData.length && (
                <div className={classes.noDataText}>
                  No data for this period
                </div>
              )}
            </>
          )}
        </div>
        <div className={classes["network-container__bar"]}>
          <div className={classes["network-container__header-text"]}>
            <Typography variant="h5" className={classes.barText}>
              Top Campaign Perfomance
            </Typography>
          </div>
          <div className={classes["network-container__bar-wrapper"]}>
            {barData.map((props, key) => (
              <div
                key={key}
                className={classes["network-container__bar-item-container"]}
              >
                <Bar {...props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

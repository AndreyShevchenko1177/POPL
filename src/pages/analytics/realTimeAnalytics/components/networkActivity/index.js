import React from "react";
import { Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import useStyles from "./styles/styles";
import DatePicker from "../../../../../components/DatePicker";
import chartData from "./mockData";
import Bar from "./bar";

const data = [
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

export default function NetworkActivity() {
  const classes = useStyles();
  return (
    <div className={classes["network-container"]}>
      <div className={classes["network-container__header"]}>
        <div className={classes["network-container__title"]}>
          <Typography variant="h5" className={classes.text}>
            Network Activities
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
          <Line data={chartData.line} />
        </div>
        <div className={classes["network-container__bar"]}>
          <div className={classes["network-container__header-text"]}>
            <Typography variant="h6" className={classes.barText}>
              Top Campaign Perfomance
            </Typography>
          </div>
          <div className={classes["network-container__bar-wrapper"]}>
            {data.map((props, key) => (
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

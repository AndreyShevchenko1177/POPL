import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import useStyles from "./styles/styles";
import DatePicker from "../../../../components/DatePicker";
import chartOptions from "./chartOptions";
import CustomBar from "./bar";
import Loader from "../../../../components/Loader";
import { getMothName, getMonth, getDay } from "../../../../utils/dates";

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

export default function NetworkActivity({
  data, calendar, setCalendar, setDate,
}) {
  const classes = useStyles();
  const [chartData, setChartData] = useState();
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
    <div className={classes["network-container"]}>
      <div className={classes["network-container__header"]}>
        <div className={classes["network-container__title"]}>
          <Typography variant="h5" className={classes.text}>
            Pops Over Time
          </Typography>
        </div>
        <div style={{ position: "relative" }}>
          <DatePicker calendar={calendar} setCalendar={setCalendar} setDate={setDate}/>
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
              {!chartData?.datasets[0]?.data?.length && (
                <div className={classes.noDataText}>
                  No data for this period
                </div>
              )}
            </>
          )}
        </div>
        {/* <div className={classes["network-container__bar"]}>
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
                <CustomBar {...props} />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

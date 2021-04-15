import React from "react";
import { Typography } from "@material-ui/core";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import useStyles from "./styles/styles";
import Loader from "../../../../components/Loader";

function StatisticItem({
  title, value, count, isFetched, icon,
}) {
  console.log(icon);
  const classes = useStyles();
  return (
    <div className={classes.topStatisticsItemContainer}>
      {count === undefined || isFetched ? (
        <Loader />
      ) : (
        <div className={classes.topStatisticsItemContentWrapper}>
          <div className={classes.topStatisticsItemTitle}>
            {icon}
            <Typography variant="h6" className={classes.titleText}>
              {title}
            </Typography>
          </div>
          <div
            className={classes.topStatisticsItemValue}
            style={{ textAlign: value ? "start" : "center" }}
          >
            {value || "-"}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticItem;

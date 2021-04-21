import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles/styles";
import Loader from "../../../../components/Loader";

function StatisticItem({
  title, value, count, isFetched, icon,
}) {
  const classes = useStyles();
  return (
    <div className={classes.topStatisticsItemContainer}>
      {count === undefined || isFetched ? (
        <Loader containerStyles={{ display: "flex", alignItems: "center" }} />
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
            style={{ textAlign: "center" }}
          >
            {value || "-"}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticItem;

import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles/styles";
import Loader from "../../../../components/Loader";
import { addCommas } from "../../../../utils";

function StatisticItem({
  title, value, count, isFetched, icon, styles,
}) {
  const classes = useStyles();
  return (
    <div className={styles?.container || classes.topStatisticsItemContainer}>
      {count === undefined || isFetched ? (
        <Loader containerStyles={{ display: "flex", alignItems: "center" }} />
      ) : (
        <div className={classes.topStatisticsItemContentWrapper}>
          <div className={classes.topStatisticsItemTitle}>
            {icon}
            <Typography variant="h6" className={styles?.titleText || classes.titleText}>
              {title}
            </Typography>
          </div>
          <div
            className={styles?.itemValue || classes.topStatisticsItemValue}
            style={{ textAlign: "center" }}
          >
            {value ? addCommas(String(value)) : "-"}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticItem;

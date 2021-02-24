import React from "react";
import { Typography } from "@material-ui/core";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import useStyles from "./styles/styles";
import Loader from "../../../../../components/Loader";

function StatisticItem({ title, value, percentage, isTop, count }) {
  const classes = useStyles();
  return (
    <div className={classes.topStatisticsItemContainer}>
      {!count ? (
        <Loader />
      ) : (
        <div className={classes.topStatisticsItemContentWrapper}>
          <div className={classes.topStatisticsItemTitle}>
            <AvTimerIcon className={classes.icon} />
            <Typography variant="h6" className={classes.titleText}>
              {title}
            </Typography>
          </div>
          <div className={classes.topStatisticsItemValue}>{value}</div>
          <div className={classes.topStatisticsItemPercentage}>
            {isTop ? (
              <ArrowDropUpIcon className={classes.topArrowIcon} />
            ) : (
              <ArrowDropDownIcon className={classes.downArrowIcon} />
            )}
            <Typography
              variant="h6"
              className={clsx(
                classes.percentage,
                isTop ? classes.colorGreen : classes.colorRed
              )}
            >
              <i>{percentage}</i>
            </Typography>
            <Typography variant="h6" className={classes.titleText}>
              From last Week
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticItem;

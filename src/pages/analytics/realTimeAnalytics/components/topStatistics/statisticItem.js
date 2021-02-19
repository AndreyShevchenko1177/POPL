import React from "react";
import { Typography } from "@material-ui/core";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import useStyles from "./styles/styles";

function StatisticItem({ title, value, percentage, isTop }) {
  const classes = useStyles();
  return (
    <div className="top-statistics-item-container">
      <div className="top-statistics-item-content-wrapper">
        <div className="top-statistics-item-title">
          <AvTimerIcon className={classes.icon} />
          <Typography variant="h6" className={classes.titleText}>
            {title}
          </Typography>
        </div>
        <div className="top-statistics-item-value">{value}</div>
        <div className="top-statistics-item-percentage">
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
    </div>
  );
}

export default StatisticItem;

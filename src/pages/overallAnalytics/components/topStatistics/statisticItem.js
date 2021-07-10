import React from "react";
import { Typography, Tooltip } from "@material-ui/core";
import useStyles from "./styles/styles";
import Loader from "../../../../components/Loader";
import { addCommas } from "../../../../utils";
import SvgMaker from "../../../../components/svgMaker";

function StatisticItem({
  title, value, count, isFetched, icon, styles, percentage,
}) {
  const classes = useStyles();

  return (
    <div className={styles?.container || classes.topStatisticsItemContainer}>
      {count === undefined || isFetched ? (
        <Loader containerStyles={{ display: "flex", alignItems: "center" }} styles={styles?.loaderStyles || {}} />
      ) : (
        <div className={classes.topStatisticsItemContentWrapper}>
          <div className={classes.topStatisticsItemTitle}>
            {/* {icon} */}
            <Typography variant="h6" className={styles?.titleText || classes.titleText}>
              {title}
            </Typography>
          </div>
          <div
            className={styles?.itemValue || classes.topStatisticsItemValue}
            style={{ textAlign: "center", display: "flex" }}
          >
            {value
              ? title !== "Tap Through Rate"
                ? addCommas(String(value))
                : <div><span>{value}</span><span style={{ fontSize: styles?.percentageFontSize || 30 }}>%</span></div>
              : "-"}
            {value && !!percentage && <div className={classes.percentageContainer}>
              <Tooltip title="compared to previous time period window" placement="top">
                <div className='flex'>
                  <div className={classes.percentageIconWrapper}>
                    <SvgMaker fill={percentage >= 0 ? "#1eb033" : "#f6941f"} width={10} height={10} name={ percentage >= 0 ? "upArrow" : "downArrow"} />
                  </div>
                  <span style={{ fontSize: 14, color: percentage >= 0 ? "#1eb033" : "#f6941f" }}>{percentage}%</span>
                </div>
              </Tooltip>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticItem;

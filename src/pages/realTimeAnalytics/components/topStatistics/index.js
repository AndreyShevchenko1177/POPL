import React, { useEffect, useState } from "react";
import StatisticItem from "./statisticItem";
import useStyles from "./styles/styles";
import initialState from "./initialState";

function TopStatistics(props) {
  const classes = useStyles();
  const [data, setData] = useState(initialState);
  useEffect(() => {
    Object.keys(props).map((prop) => {
      setData((prev) => prev.map((item) => {
        if (item.id === prop) {
          item.value = props[prop];
        }
        return item;
      }));
    });
  }, [props]);

  return (
    <div className={classes.topStatisticsContainer}>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <StatisticItem
            count={props.popsCount}
            isFetched={props.isFetched}
            {...item}
          />
          <div className={classes.topStatisticsItemsDivider}></div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TopStatistics;

import React, { useEffect, useState } from "react";
import StatisticItem from "./statisticItem";
import useStyles from "./styles/styles";
import initialState from "./initialState";

function TopStatistics(props) {
  const classes = useStyles();
  const [data, setData] = useState(initialState);

  useEffect(() => {
    Object.keys(props).map((prop) => {
      setData((prev) =>
        prev.map((item) => {
          if (item.id === prop) {
            item.value = props[prop];
          }
          return item;
        })
      );
    });
  }, []);
  return (
    <div className={classes.topStatisticsContainer}>
      {data.map(({ id, title, value, percentage, isTop }) => (
        <React.Fragment key={id}>
          <StatisticItem
            title={title}
            value={value}
            percentage={percentage}
            isTop={isTop}
          />
          <div className={classes.topStatisticsItemsDivider}></div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TopStatistics;

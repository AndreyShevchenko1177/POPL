import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@material-ui/core";
import StatisticItem from "./statisticItem";
import useStyles from "./styles/styles";
import initialState from "./iconsConfig";

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

  console.log(data);

  return (

    <div className={classes.topStatisticsContainer}>
      <div>
        <Typography variant="body2">All time</Typography>
      </div>
      <Paper elevation={3} className={classes.topStatisticsWrapper}>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <StatisticItem
              count={props.popsCount}
              isFetched={props.isFetched[item.id]}
              {...item}
            />
            <div className={classes.topStatisticsItemsDivider}></div>
          </React.Fragment>
        ))}
      </Paper>
    </div>

  );
}

export default TopStatistics;

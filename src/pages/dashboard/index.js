import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import PoplCard from "./components/PoplCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import mockData from "./mockData";

export default function Dashboard(props) {
  const classes = useStyles();
  return (
    <div className="main-padding">
      <h2>Dashboard</h2>
      <h3>Latest popls </h3>
      <div className={classes.container}>
        <div className={classes.popl_container}>
          <PoplCard name="Popl1" />
        </div>
        {/* <div className={classes.popl_container}>
          <PoplCard name="Popl2" />
        </div>
        <div className={classes.popl_container}>
          <PoplCard name="Popl3" />
        </div> */}
      </div>
      <Paper className={classes.chart_container}>
        <Typography variant="h5">Overall Scan Statistics</Typography>
        <Chart data={mockData} />
      </Paper>
    </div>
  );
}

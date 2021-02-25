import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Button } from "@material-ui/core";
import PoplCard from "./components/PoplCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import { getPopsAction } from "../analytics/store/actions";

export default function Dashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const popsData = useSelector(
    ({ analyticsReducer }) => analyticsReducer.allPops.data
  );
  const [chartData, setChartData] = useState();

  const handleOpen = () => {
    history.push("/new-profile");
  };

  useEffect(() => {
    !Object.keys(popsData).length && dispatch(getPopsAction(userId));
  }, []);

  useEffect(() => {
    if (popsData.length) {
      const result = {};
      popsData.forEach((pop) => {
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        if (currentMonth === Number(pop[2].split("-")[1])) {
          const date = pop[2].split(" ")[0];
          result[date] = (result[date] || 0) + 1;
        }
      });
      setChartData(result);
    }
  }, [popsData]);

  return (
    <div className="main-padding">
      <Typography variant="h3">Welcome</Typography>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add profile
        </Button>
      </div>
      <Paper className={classes.chart_container}>
        <Typography className="pb-10" variant="h5">
          Cumulative pop data
        </Typography>
        <Chart data={chartData} />
      </Paper>
      <div className={classes.latestPoplsContainer}>
        <Typography variant="h5">Latest popls</Typography>
      </div>
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
    </div>
  );
}

import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Button } from "@material-ui/core";
import PoplCard from "./components/PoplCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import { getPopsAction } from "../realTimeAnalytics/store/actions";
import generateChartData from "../../utils/generatePopsActivityBarChartData";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const [chartData, setChartData] = useState();

  const handleOpen = () => {
    history.push("/profiles/new-profile");
  };

  useEffect(() => {
    if (!popsData) dispatch(getPopsAction(userId));
  }, []);

  useEffect(() => {
    if (popsData?.length) {
      setChartData(generateChartData(popsData));
    } else {
      setChartData(popsData);
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
      </div>
    </div>
  );
}

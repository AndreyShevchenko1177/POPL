import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Button } from "@material-ui/core";
import PoplCard from "./components/PoplCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import { getPopsAction } from "../overallAnalytics/store/actions";
import { generateLineChartData } from "../../utils";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.allPops.data,
  );
  const [chartData, setChartData] = useState();

  const handleOpen = () => {
    history.push("/profiles/new-profile");
  };

  useEffect(() => {
    if (!popsData) dispatch(getPopsAction());
  }, []);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      setChartData(generateLineChartData(popsData));
    } else {
      setChartData(popsData);
    }
  }, [popsData]);

  return (
    <div className="main-padding">
      <Typography variant="h3">Welcome {userData.name}</Typography>
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
        <Typography style={{ paddingBottom: 40 }} className="pb-10" variant="h5">
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

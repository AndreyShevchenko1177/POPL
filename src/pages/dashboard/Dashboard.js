import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper, Typography, Button, Tooltip,
} from "@material-ui/core";
import ConnectionCard from "./components/ConnectionCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import { getPopsAction } from "../overallAnalytics/store/actions";
import { getProfileInfoRequest } from "../../store/actions";
import { generateLineChartData } from "../../utils";
import Loader from "../../components/Loader";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const { latestConnections } = useSelector(({ systemReducer }) => systemReducer.profileInfoSideBar.result);
  const popsData = useSelector(
    ({ realTimeAnalytics }) => realTimeAnalytics.dashboardPops,
  );
  const { isFetching } = useSelector(({ systemReducer }) => systemReducer);
  const [chartData, setChartData] = useState();

  const handleOpen = () => {
    history.push("/profiles/add-profile");
  };

  useEffect(() => {
    if (!popsData) dispatch(getPopsAction());
    dispatch(getProfileInfoRequest(userData.id));
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
      <div className={classes.headingWrapper}>
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
      </div>
      <Paper className={classes.chart_container}>
        <Typography style={{ paddingBottom: 40 }} className="pb-10" variant="h5">
          Cumulative pop data
        </Typography>
        <Chart data={chartData} />
      </Paper>
      <div className={classes.latestPoplsContainer}>
        <Typography variant="h5">Latest connections</Typography>
      </div>
      <div className={classes.container}>
        {latestConnections && !isFetching
          ? latestConnections.map((connection, index) => (
            <div key={index} className={classes.connections_container}>
              <ConnectionCard {...connection} />
            </div>
          ))
          : <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
        }
        {latestConnections?.length > 0 && !isFetching && <Tooltip title='Show more'><ArrowForwardIosIcon onClick={() => history.push("/connections")} className={classes.showMoreIcon} /></Tooltip>}
        {latestConnections?.length === 0 && !isFetching && <div><b>You haven't any connections</b></div>}
      </div>
    </div>
  );
}

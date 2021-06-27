import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper, Typography, Button, Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import ConnectionCard from "./components/ConnectionCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import { getPopsAction } from "./store/actions";
import { getLatestConnectionsAction } from "../../store/actions";
import { setIsSignAction } from "../auth/store/actions";
import { generateLineChartData } from "../../utils";
import Loader from "../../components/Loader";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const profilesData = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  const isSign = useSelector(({ authReducer }) => authReducer.isSign); // if true it means user signed in, not page refresh
  const latestConnections = useSelector(({ systemReducer }) => systemReducer.latestConnections.data);
  const latestConnectionsFetching = useSelector(({ systemReducer }) => systemReducer.latestConnections.isFetching);
  const allPopsData = useSelector(
    ({ dashboardReducer }) => dashboardReducer.allPops.data,
  );
  const [popsData, setPopsData] = useState(null);
  const [chartData, setChartData] = useState();

  const handleOpen = () => {
    history.push("/accounts/add-account", { rootPath: "/", path: "/" });
  };

  useEffect(() => {
    setPopsData(allPopsData);
  }, [allPopsData]);

  useEffect(() => {
    if (profilesData) {
      dispatch(getLatestConnectionsAction());
      dispatch(getPopsAction());
    }
  }, [profilesData]);

  useEffect(() => {
    if (dashboardPlan === 0 && isSign && profilesData?.length === 1) {
      dispatch(setIsSignAction(false));
      history.push("/settings/general-settings", { firstLogin: true });
    }
  }, [dashboardPlan, profilesData]);

  useEffect(() => {
    if (popsData && Object.values(popsData).length) {
      setChartData(generateLineChartData({
        poplPops: popsData.poplPops,
        qrCodePops: [...popsData.qrCodePops, ...popsData.walletPops],
        allPops: popsData.allPops,
      }));
    } else {
      setChartData(popsData);
    }
  }, [popsData]);

  return (
    <div className={clsx("main-padding", classes.root)}>
      <div className={classes.headingWrapper}>
        <Typography variant="h3">Welcome {profilesData && profilesData[0]?.name}</Typography>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.button, iconSizeMedium: classes.addIcon }}
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
          Add Accounts
          </Button>
        </div>
      </div>
      <Paper className={classes.chart_container}>
        <Typography style={{ paddingBottom: 50 }} className="pb-10" variant="h5">
          Cumulative pop data
        </Typography>
        <Chart data={chartData} />
      </Paper>
      <div className={classes.latestConnectionsWrapper}>
        <div className={classes.latestPoplsContainer}>
          <Typography variant="h5">Latest connections</Typography>
        </div>
        <div className={classes.container}>
          {latestConnections && !latestConnectionsFetching
            ? latestConnections.map((connection, index) => (
              <div key={index} className={classes.connections_container}>
                <ConnectionCard {...connection} />
              </div>
            ))
            : <Loader styles={{ position: "absolute", top: "50%", left: "50%" }} />
          }
          {latestConnections?.length > 0 && !latestConnectionsFetching && <Tooltip title='Show more'><ArrowForwardIosIcon onClick={() => history.push("/connections")} className={classes.showMoreIcon} /></Tooltip>}
          {latestConnections?.length === 0 && !latestConnectionsFetching && <div><b>You haven't any connections</b></div>}
        </div>
      </div>
    </div>
  );
}

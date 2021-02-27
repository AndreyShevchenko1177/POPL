import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Button } from "@material-ui/core";
import PoplCard from "./components/PoplCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import { getPopsAction } from "../analytics/store/actions";
import { getYear, getMonth, getDay, normalizeDate } from "../../utils/dates";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);
  const popsData = useSelector(
    ({ analyticsReducer }) => analyticsReducer.allPops.data
  );
  const [chartData, setChartData] = useState();

  const handleOpen = () => {
    history.push("/profiles/new-profile");
  };

  useEffect(() => {
    if (!popsData) dispatch(getPopsAction(userId));
    // !Object.keys(popsData).length && dispatch(getPopsAction(userId));
  }, []);

  useEffect(() => {
    if (popsData?.length) {
      const result = {};
      const currentDate = new Date();
      const periodDate = new Date().setDate(currentDate.getDate() - 30);
      const [_cy, currentMonth, _cd] = `${getYear(currentDate)}-${normalizeDate(
        getMonth(currentDate) + 1
      )}-${normalizeDate(getDay(currentDate))}`.split("-");
      const [_py, periodMonth, periodDay] = `${getYear(
        periodDate
      )}-${normalizeDate(getMonth(periodDate) + 1)}-${normalizeDate(
        getDay(periodDate)
      )}`.split("-");
      popsData.forEach((pop) => {
        const [_ry, receiveMonth, receiveDay] = pop[2].split(" ")[0].split("-");
        if (currentMonth === receiveMonth) {
          const date = pop[2].split(" ")[0];
          result[date] = (result[date] || 0) + 1;
        } else if (
          Number(periodDay) <= Number(receiveDay) &&
          periodMonth === receiveMonth
        ) {
          const date = pop[2].split(" ")[0];
          result[date] = (result[date] || 0) + 1;
        }
      });
      setChartData(result);
    }
    setChartData(popsData);
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

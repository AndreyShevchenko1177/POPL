import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { Paper, Typography, Button } from "@material-ui/core";
import PoplCard from "./components/PoplCard";
import useStyles from "./styles/style";
import Chart from "./components/Chart";
import mockData from "./mockData";

export default function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleOpen = () => {
    history.push("/new-profile", { path: "/", page: "Overview" });
  };

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
        <Chart data={mockData} />
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

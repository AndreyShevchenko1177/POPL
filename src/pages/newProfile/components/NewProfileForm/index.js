import React from "react";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./styles";
import TabNavigation from "./tabNavigation";
import NewProfileHeader from "./newProfileHeader";

export default function NewProfileForm() {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.rootContainer}>
        <Grid item xs={12} className={classes.gridItem}>
          <NewProfileHeader />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TabNavigation />
        </Grid>
      </Paper>
    </>
  );
}

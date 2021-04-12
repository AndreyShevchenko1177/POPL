import React from "react";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./inviteByEmail/styles";
import TabNavigation from "./inviteByEmail/TabNavigation";
import InviteHeader from "./inviteByEmail/InviteHeader";

export default function TabContainer() {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.rootContainer}>
        <Grid item xs={12} className={classes.gridItem}>
          <InviteHeader />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TabNavigation />
        </Grid>
      </Paper>
    </>
  );
}

import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./inviteByEmail/styles";
import TabNavigation from "./inviteByEmail/TabNavigation";
import InviteHeader from "./inviteByEmail/InviteHeader";

export default function TabContainer() {
  const classes = useStyles();
  const [headerValue, setHeaderValue] = useState("Invite to existing Popl Account's Emails");

  return (
    <>
      <Paper className={classes.rootContainer}>
        <Grid item xs={12} className={classes.gridItem}>
          <InviteHeader header={headerValue} />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <TabNavigation setHeaderValue={setHeaderValue} />
        </Grid>
      </Paper>
    </>
  );
}

import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

function NewProfileHeader() {
  const classes = useStyles();
  return (
    <div className={classes.newProfileHeaderContainer}>
      <Typography variant="h5">Add profile method</Typography>
    </div>
  );
}

export default NewProfileHeader;

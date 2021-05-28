import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

function NewProfileHeader({ header }) {
  const classes = useStyles();
  return (
    <div className={classes.newProfileHeaderContainer}>
      <Typography variant="h5">{header}</Typography>
    </div>
  );
}

export default NewProfileHeader;

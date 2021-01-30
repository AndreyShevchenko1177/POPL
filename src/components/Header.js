import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
    height: "70px",
  },
  arrowIcon: {
    fontSize: "20px",
    color: "#565956",
    margin: "0 10px",
  },
}));

function Header({ rootLink, firstChild }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="body1">{rootLink}</Typography>
      <ArrowForwardIosIcon className={classes.arrowIcon} />
      <Typography variant="h5">{firstChild}</Typography>
    </Paper>
  );
}

export default Header;

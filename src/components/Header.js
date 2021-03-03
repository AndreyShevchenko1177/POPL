import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
    height: "70px",
    zIndex: "1000",
  },
  arrowIcon: {
    fontSize: "20px",
    color: "#565956",
    margin: "0 10px",
  },
  rootLink: {
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
  },
}));

function Header({ rootLink, firstChild, path }) {
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = () => history.push(path);

  return (
    <Paper className={classes.root}>
      <Typography
        onClick={handleRedirect}
        className={firstChild && classes.rootLink}
        variant="body1"
      >
        {rootLink}
      </Typography>
      {firstChild && <ArrowForwardIosIcon className={classes.arrowIcon} />}
      <Typography variant="h5">{firstChild}</Typography>
    </Paper>
  );
}

export default Header;

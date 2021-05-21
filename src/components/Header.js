import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
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

function Header({
  rootLink, firstChild, lastChild, path, rootLinkClick, firstChildRedirectPath,
}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleRedirect = () => {
    if (lastChild || firstChild) {
      history.push(path);
      rootLinkClick && rootLinkClick();
    }
  };

  const firstChildRedirect = () => history.push(firstChildRedirectPath);

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography
        onClick={handleRedirect}
        className={lastChild && classes.rootLink}
        variant="body1"
      >
        {rootLink}
      </Typography>
      {firstChild && <ArrowForwardIosIcon className={classes.arrowIcon} />}
      <Typography
        className={firstChildRedirectPath && classes.rootLink}
        variant="body1"
        onClick={firstChildRedirect}
      >
        {firstChild}
      </Typography>
      {lastChild && <ArrowForwardIosIcon className={classes.arrowIcon} />}
      <Typography variant="h5">{lastChild}</Typography>
    </Paper>
  );
}

export default Header;

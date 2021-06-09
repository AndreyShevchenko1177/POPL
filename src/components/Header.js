import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
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
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const handleRedirect = () => {
    if (lastChild || firstChild) {
      history.push(path);
      rootLinkClick && rootLinkClick();
    }
  };

  const firstChildRedirect = () => history.push(firstChildRedirectPath);

  return (
    <Paper elevation={0} className={classes.root}>
      <div
        style={{
          padding: "10px 20px",
          width: "100%",
          backgroundColor: companyInfo && companyInfo[1] ? `${companyInfo[1]}0f` : "#ffffff",
          display: "flex",
          alignItems: "center",
          height: 70,
        }}
      >
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
      </div>

    </Paper>
  );
}

export default Header;

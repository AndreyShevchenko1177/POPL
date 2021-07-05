import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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
    cursor: "pointer",
  },
  rootLink: {
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
  },
}));

function Header({
  rootLink, firstChild, lastChild, path, rootLinkClick, firstChildRedirectPath, leftPadding,
}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const handleRedirect = () => {
    if (lastChild || firstChild) {
      history.push(path, { path: location.state.path, rootPath: location.state.rootPath });
      rootLinkClick && rootLinkClick();
    }
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <div
        style={{
          padding: `10px 20px 10px ${leftPadding || "40px"}`,
          width: "100%",
          backgroundColor: companyInfo && companyInfo[1] ? `${companyInfo[1]}0f` : "#ffffff",
          display: "flex",
          alignItems: "center",
          height: 70,
        }}
      >
        {firstChild && <ArrowBackIosIcon onClick={handleRedirect} className={classes.arrowIcon} />}
        <Typography
          onClick={handleRedirect}
          className={firstChild && classes.rootLink}
          variant="body1"
        >
          {rootLink || "Back"}
        </Typography>

        {/* {firstChild && <ArrowBackIosIcon className={classes.arrowIcon} />}
        <Typography
          className={firstChildRedirectPath && classes.rootLink}
          variant="body1"
          onClick={firstChildRedirect}
        >
          {firstChild}
        </Typography>
        {lastChild && <ArrowBackIosIcon className={classes.arrowIcon} />}
        <Typography variant="h5">{lastChild}</Typography> */}
      </div>

    </Paper>
  );
}

export default Header;

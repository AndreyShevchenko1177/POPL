import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useSelector } from "react-redux";
import clsx from "clsx";
import calendarViewMode from "../pages/campaings/img/calendar_view.jpg";
import calendarViewGrayedMode from "../pages/campaings/img/calendar_view_greyed.jpg";
import listViewMode from "../pages/campaings/img/list_view.jpg";
import listViewGrayedMode from "../pages/campaings/img/list_view_greyed.jpg";

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

  calendarModeSwitcher: {
    display: "flex",
    cursor: "pointer",
    marginLeft: "20px",
    padding: "5px 10px",
    border: "1px solid gray",
    borderRadius: "5px",
    "& img": {
      width: "20px",
      height: "20px",
      display: "block",
    },
    "& div": {
      "&:first-child": {
        marginRight: "10px",
      },
    },
  },

  backgroundGray: {
    backgroundColor: "gray",
  },
}));

function Header({
  rootLink, firstChild, lastChild, path, rootLinkClick, firstChildRedirectPath, leftPadding, campaignsMode,
}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  const isCalendarMode = () => (campaignsMode === "calendar");

  const handleRedirect = () => {
    if (lastChild || firstChild) {
      history.push(path, { path: location.state?.path, rootPath: location.state?.rootPath });
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

        {rootLink === "Campaigns"
          && <div className={classes.calendarModeSwitcher} >
            <div className={clsx("", (isCalendarMode() ? classes.backgroundGray : ""))}>
              <img src={isCalendarMode() ? calendarViewGrayedMode : calendarViewMode} />
            </div>
            {/* <div className={clsx("", (!isCalendarMode() ? classes.backgroundGray : ""))}> */}
            <div className={classes.backgroundGray}>
              <img src={isCalendarMode() ? listViewMode : listViewGrayedMode} />
            </div>
          </div>}

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

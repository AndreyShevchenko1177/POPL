import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Sidebar from "./Sidebar";
import CSnackbar from "../components/SnackBar";
import { restricteModeAction } from "../store/actions";
import { subscriptionConfig } from "../pages/billing/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  restrictedViewRoot: {
    position: "absolute",
    top: 0,
    right: 0,
    backdropFilter: "blur(10px)",
    "-webkit-backdrop-filter": "blur(10px)",
    width: "100%",
    height: "100vh",
    zIndex: 1000,
  },
  restrictedViewOpacity: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.custom.modalOpacityBackground,
    opacity: theme.custom.modalOpacity,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  upgradePlanButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "-webkit-transform": "translate(-50%,-50%)",
    zIndex: 2000,
  },
}));

export default function Main({ children, stripe }) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isRestrictedMode } = useSelector(({ systemReducer }) => systemReducer);
  const { totalProfiles } = useSelector(({ systemReducer }) => systemReducer.profileInfoSideBar.result);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);

  useEffect(() => {
    if (location.pathname === "/settings/billing") dispatch(restricteModeAction(false));
  }, [location]);

  useEffect(() => {
    if (totalProfiles && dashboardPlan) {
      const subscription = subscriptionConfig.find((sub) => sub.id == dashboardPlan);
      if (subscription) {
        if (totalProfiles > subscription.unitsRange[1]) dispatch(restricteModeAction(true));
      }
    }
  }, [totalProfiles, dashboardPlan]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CSnackbar />
      {!stripe && <Sidebar />}
      <main
        style={{
          flexGrow: 1,
          position: "relative",
          height: "100vh",
          backgroundColor: "#ffffff",
          overflow: isRestrictedMode ? "hidden" : "auto",
          maxWidth: "calc(100vw - 300px)",
        }}
      >
        <>
          {children}
          {isRestrictedMode && <div className={classes.restrictedViewRoot}>
            <div className={classes.restrictedViewOpacity}>

            </div>
            <HighlightOffIcon
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
              }}
              onClick={() => dispatch(restricteModeAction(false))}
            />
            <Button
              className={classes.upgradePlanButton}
              variant="contained"
              color="primary"
              onClick={() => history.push("/settings/billing")}
            >
              Subscribe now
            </Button>
          </div>}

        </>
      </main>
    </div>
  );
}

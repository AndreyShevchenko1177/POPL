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
    position: "fixed",
    top: 0,
    right: 0,
    backdropFilter: "blur(10px)",
    "-webkit-backdrop-filter": "blur(10px)",
    width: "calc(100% - 300px)",
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
  const { isRestrictedMode, isMainPageScroll } = useSelector(({ systemReducer }) => systemReducer);
  const totalProfiles = useSelector(({ systemReducer }) => systemReducer.profilesInfoMainPage);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  // for development mode
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data?.id);

  useEffect(() => {
    if (dashboardPlan !== null) {
      const allowedPaths = ["/settings", "/settings/billing", "/settings/general-settings", "/profiles/add-profile", "/profiles/new-profile", "/profiles/add-profile/new"];
      if (dashboardPlan == 0 || dashboardPlan === "") {
        if (!allowedPaths.includes(location.pathname)) {
          if (location.pathname === "/" && totalProfiles === 1) return dispatch(restricteModeAction(false));
          if (totalProfiles > 1 && location.pathname === "/profiles") return dispatch(restricteModeAction(true));
          return dispatch(restricteModeAction(true));
        }
        dispatch(restricteModeAction(false));
      } else {
        const subscription = subscriptionConfig.find((sub) => sub.id == dashboardPlan);
        if (!allowedPaths.includes(location.pathname)) {
          if (totalProfiles > subscription.unitsRange[1]) {
            return dispatch(restricteModeAction(true));
          }
          return dispatch(restricteModeAction(false));
        }
        dispatch(restricteModeAction(false));
      }
    }
  }, [location, totalProfiles, dashboardPlan]);

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
          overflow: (isRestrictedMode && userId !== "243104") || !isMainPageScroll ? "hidden" : "auto",
          maxWidth: "calc(100vw - 300px)",
        }}
        id='main'
      >
        <>
          {children}
          {isRestrictedMode && userId !== "243104" // userId checkout used just for development
            && <div
              style={location.pathname === "/" ? { height: "calc(100vh - 110px)", top: 110 } : {}}
              className={classes.restrictedViewRoot}
            >
              <div className={classes.restrictedViewOpacity}>

              </div>
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

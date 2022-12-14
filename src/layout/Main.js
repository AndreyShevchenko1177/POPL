import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./Sidebar";
import CSnackbar from "../components/SnackBar";
import { restricteModeAction } from "../store/actions";
import { subscriptionConfig } from "../pages/billing/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  main: {
    flexGrow: 1,
    position: "relative",
    height: "100vh",
    maxWidth: `calc(100vw - ${theme.custom.drawerWidth}px)`,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  restrictedViewRoot: {
    position: "fixed",
    top: 0,
    right: 0,
    backdropFilter: "blur(10px)",
    "-webkit-backdrop-filter": "blur(10px)",
    width: `calc(100% - ${theme.custom.drawerWidth}px)`,
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
  buttonsWrapper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "-webkit-transform": "translate(-50%,-50%)",
    zIndex: 2000,
  },
  accountsButtonsWrapper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "-webkit-transform": "translate(-50%,-50%)",
    zIndex: 1000,
    "@media(max-height:850px)": {
      top: 410,
      transform: "translate(-50%, 0)",
    },
  },
  addAccountsBtn: {
    marginBottom: 10,
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
  const stripeQuantity = useSelector(({ systemReducer }) => systemReducer.setMeteredSubQuantity);
  // for development mode
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data?.id);
  const companyInfo = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  useEffect(() => {
    if (dashboardPlan !== null) {
      const allowedPaths = ["/settings", "/settings/billing", "/settings/general-settings", "/accounts/new-account/log-in", "/accounts/new-account/email-invite", "/accounts/add-account", "/accounts/add-account/new"];
      if (dashboardPlan == 0 || dashboardPlan === "") {
        if (!allowedPaths.includes(location.pathname)) {
          if (["/", "/connections", "/notifications"].includes(location.pathname) && totalProfiles === 1) return dispatch(restricteModeAction(false));
          if (totalProfiles > 1 && location.pathname === "/accounts") {
            return dispatch(restricteModeAction(true));
          }
          return dispatch(restricteModeAction(true));
        }

        dispatch(restricteModeAction(false));
      } else {
        const subscription = subscriptionConfig.find((sub) => sub.id == dashboardPlan);
        if (dashboardPlan == "10" && stripeQuantity) { // setting actual quantity to unitsRange if subscription is on metered pricing
          subscription.unitsRange = [0, stripeQuantity];
        }
        if (!allowedPaths.includes(location.pathname)) {
          if (totalProfiles > subscription.unitsRange[1]) {
            return dispatch(restricteModeAction(true));
          }
          return dispatch(restricteModeAction(false));
        }
        dispatch(restricteModeAction(false));
      }
    }
  }, [location, totalProfiles, dashboardPlan, stripeQuantity]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CSnackbar />
      {!stripe && <Sidebar />}
      <main
        style={{
          backgroundColor: companyInfo && companyInfo[1] ? `${companyInfo[1]}0f` : "#ffffff",
          overflow: (isRestrictedMode && (userId !== "243104" && userId !== "293299")) || !isMainPageScroll ? "hidden" : "auto",
        }}
        className={classes.main}
        id='main'
      >
        <>
          {children}
          {isRestrictedMode && (userId !== "243104" && userId !== "293299") // userId checkout used just for development
            && (
              location.pathname === "/accounts" && totalProfiles === 1
                ? <div className={classes.accountsButtonsWrapper}>
                  <Button
                    className={classes.addAccountsBtn}
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/accounts/add-account", { rootPath: "/accounts", path: "/accounts" })}
                  >
                    Add Accounts
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/settings/billing")}
                  >
                    Start free trial to unlock dashboard
                  </Button>
                </div>
                : <div
                  style={location.pathname === "/" ? { height: "calc(100vh - 90px)", top: 90 } : {}}
                  className={classes.restrictedViewRoot}
                >
                  <div className={classes.restrictedViewOpacity}>

                  </div>
                  <div className={classes.buttonsWrapper}>
                    <Button
                      className={classes.addAccountsBtn}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        history.push("/accounts/add-account", { rootPath: location.pathname, path: location.pathname });
                      }}
                    >
                      Add Accounts
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push("/settings/billing")}
                    >
                      Start free trial to unlock dashboard
                    </Button>
                  </div>
                </div>
            )}
        </>
      </main>
    </div>
  );
}

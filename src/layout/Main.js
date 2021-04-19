import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Sidebar from "./Sidebar";
import CSnackbar from "../components/SnackBar";

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
  const history = useHistory();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const [isRestricted, setIsRestricted] = useState(true);

  useEffect(() => {
    if (userData.id == 2097) setIsRestricted(true);
  }, []);

  useEffect(() => {
    if (location.pathname === "/settings/billing") return setIsRestricted(false);
  }, [location]);

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
          overflow: isRestricted ? "hidden" : "auto",
          maxWidth: "calc(100vw - 300px)",
        }}
      >
        <>
          {children}
          {isRestricted && <div className={classes.restrictedViewRoot}>
            <div className={classes.restrictedViewOpacity}>

            </div>
            <HighlightOffIcon
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
              }}
              onClick={() => setIsRestricted(false)}
            />
            <Button
              className={classes.upgradePlanButton}
              variant="contained"
              color="primary"
              onClick={() => history.push("/settings/billing")}
            >
              Upgrade Plan
            </Button>
          </div>}

        </>
      </main>
    </div>
  );
}

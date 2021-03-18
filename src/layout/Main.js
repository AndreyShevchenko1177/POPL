import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./Sidebar";
import CSnackbar from "../components/SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {

  },
}));

export default function Main({ children, stripe }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CSnackbar />
      {!stripe && <Sidebar />}
      <main
        style={{
          flexGrow: 1,
          backgroundColor: "#ffffff",
          overflow: location.pathname === "/connections" ? "hidden" : "",
        }}
      >
        {children}
      </main>
    </div>
  );
}

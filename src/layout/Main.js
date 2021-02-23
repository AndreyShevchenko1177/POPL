import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import CSnackbar from "../components/SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
}));

export default function Main({ children }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CSnackbar />
      <Sidebar />
      <main className={classes.content}>{children}</main>
    </div>
  );
}

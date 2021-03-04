import React from "react";
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
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
}));

export default function Main({ children, stripe }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CSnackbar />
      {!stripe && <Sidebar />}
      <main className={classes.content}>{children}</main>
    </div>
  );
}

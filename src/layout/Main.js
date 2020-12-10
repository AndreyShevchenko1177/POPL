import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing(3)}px 40px`,
  },
}));

export default function Main({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <Navbar /> */}
      <Sidebar />
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {children}
      </main>
    </div>
  );
}

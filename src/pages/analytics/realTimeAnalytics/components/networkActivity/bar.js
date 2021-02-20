import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles/styles";

export default function Bar({ title, value }) {
  const classes = useStyles();
  return (
    <>
      <div style={{ paddingBottom: "5px" }}>
        <Typography variant="h6" className={classes.text}>
          {title}
        </Typography>
      </div>
      <div
        style={{
          width: "250px",
          height: "12px",
          backgroundColor: "#efefef",
        }}
      ></div>
      <div
        style={{ width: `${(250 * value) / 100}px` }}
        className={classes["network-container__bar-item"]}
      ></div>
    </>
  );
}

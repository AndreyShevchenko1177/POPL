import React from "react";

import useStyles from "./styles/styles";

const dotsPositon = {
  left: "dragDotsLeft",
  center: "dragDotsCenter",
  right: "dragDotsRight",
};

export default function DragDots({ position }) {
  const classes = useStyles();
  return (
    <div className={classes[dotsPositon[position]]}>
      <div className={classes.dots_container}>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </div>
      <div className={classes.dots_container}>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </div>
    </div>
  );
}

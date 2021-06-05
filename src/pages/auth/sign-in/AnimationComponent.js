import React from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "./styles";
import { isSafari as safari } from "../../../constants";
import poplLogo from "../../../assets/popl-enterprise.png";

function AnimationComponent() {
  const classes = useStyles();
  const isSafari = safari;
  return (
    <div className={clsx(classes.animationContainer, {
      gif: isSafari,
    })}>
      <div className={classes.textContainer}>

        <img className={classes.animationLogo} alt='logo' src={poplLogo} />
      </div>
      {!isSafari && <>
        <div className={classes.bottomAnimationWrapper}>
          <div className={classes.animationCirclesWrapper}>
            <div className={clsx(classes.animationCircle, classes.animationDelay_0)}></div>
            <div className={clsx(classes.animationCircle, classes.animationDelay_2)}></div>
            <div className={clsx(classes.animationCircle, classes.animationDelay_4)}></div>
          </div>
        </div>
        <div className={classes.topAnimationWrapper}>
          <div className={classes.animationCirclesWrapper}>
            <div className={clsx(classes.animationCircle, classes.animationDelay_0)}></div>
            <div className={clsx(classes.animationCircle, classes.animationDelay_2)}></div>
            <div className={clsx(classes.animationCircle, classes.animationDelay_4)}></div>
          </div>
        </div>
      </>}
    </div>
  );
}

export default AnimationComponent;

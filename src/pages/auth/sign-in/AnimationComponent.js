import React from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "./styles";

function AnimationComponent() {
  const classes = useStyles();
  return (
    <div className={classes.animationContainer}>
      <div className={classes.textContainer}>
        <Typography className={classes.animationContainerHeading} variant='h2'>Some Heading</Typography>
        <Typography variant='h6'>Some description</Typography>
        <Typography variant='h6'>Contact us at <a className={classes.link} href="https://popl.co/" target='blank'>popl.co</a></Typography>
      </div>
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
    </div>
  );
}

export default AnimationComponent;

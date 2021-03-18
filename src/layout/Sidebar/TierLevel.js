import React from "react";
import { Button, Typography } from "@material-ui/core";
import CloudIcon from "../../assets/svg/cloud.svg";
import useStyles from "./styles/styles";

function TierLevel({ used, max }) {
  const classes = useStyles();
  return (
    <div className={classes.tierContainer}>
      <div className={classes.tierHeader}>
        <img alt='' className={classes.tierIcon} src={CloudIcon} />
        <span>Tier Level</span>
      </div>
      <>
        <div className={classes.barTrack}>
          <div
            style={{ width: `${(250 * used) / 100}px` }}
            className={classes.networkContainerBarItem}
          ></div>
        </div>
      </>
      <div className={classes.tierValue}>
        <span>{used} GB of {max} GB used</span>
      </div>
      <Button
        variant='outlined'
        classes={{ root: classes.tierButton }}
      >
        Increase Level
      </Button>
    </div>
  );
}

export default TierLevel;

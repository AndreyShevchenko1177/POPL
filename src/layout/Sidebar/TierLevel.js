import React from "react";
import { Button } from "@material-ui/core";
import useStyles from "./styles/styles";
import SvgMaker from "../../components/svgMaker/SvgMaker";

function TierLevel({ used, max }) {
  const classes = useStyles();
  return (
    <div className={classes.tierContainer}>
      <div className={classes.tierHeader}>
        <div className={classes.tierIcon}>
          <SvgMaker fill='#fff' width={30} height={30} name='users'/>
          {/* <img src={users} /> */}
        </div>
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
        <span>{used} profiles of {max} profiles used</span>
      </div>
      <Button
        variant='outlined'
        classes={{ root: classes.tierButton }}
      >
        Upgrade Plan
      </Button>
    </div>
  );
}

export default TierLevel;

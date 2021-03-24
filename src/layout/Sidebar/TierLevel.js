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
          <SvgMaker fill="#000000" width={30} height={30} name='users'/>
          {/* <img src={users} /> */}
        </div>
        <span>Tier Level</span>
      </div>
      <>
        <div className={classes.barTrack}>
          <div
            style={{ width: `${((used / max) * 100) > 100 ? 100 : (used / max) * 100}%`, backgroundColor: ((used / max) * 100) > 100 ? "#F52B00" : "#73bef2" }}
            className={classes.networkContainerBarItem}
          ></div>
        </div>
      </>
      <div className={classes.tierValue}>
        <span>{used || ""} profiles of {max} profiles used</span>
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

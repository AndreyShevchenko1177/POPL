import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import useStyles from "./styles/styles";
import SvgMaker from "../../components/svgMaker/SvgMaker";

function TierLevel({ count, subscriptionName, maxProfiles }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.tierContainer}>
      <div className={classes.tierHeader}>
        <div className={classes.tierIcon}>
          <SvgMaker fill="#7d8286" width={30} height={30} name='users'/>
        </div>
        <span>{"Tier Level"}</span>
      </div>
      {count && <>
        <div className={classes.barTrack}>
          <div
            style={{ width: `${((count / 5) * 100) > 100 ? 100 : (count / 5) * 100}%`, backgroundColor: ((count / 5) * 100) > 100 ? "#F52B00" : "#73bef2" }}
            className={classes.networkContainerBarItem}
          ></div>
        </div>
        <div className={classes.tierValue}>
          <span>{count || ""} profiles of {5} profiles used</span>
        </div>
      </>}
      <Button
        variant='outlined'
        classes={{ root: classes.tierButton }}
        onClick={() => history.push("/settings/billing")}
      >
        Upgrade Plan
      </Button>
    </div>
  );
}

export default TierLevel;

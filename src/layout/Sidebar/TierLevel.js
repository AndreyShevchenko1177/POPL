import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import useStyles from "./styles/styles";
import SvgMaker from "../../components/svgMaker/SvgMaker";

function TierLevel({ count, subscriptionName, maxProfiles }) {
  const classes = useStyles();
  const history = useHistory();

  const generateMax = (count) => {
    if (count < 6) return 5;
    if (count > 5 && count < 21) return 20;
    if (count > 20) return 100;
    return 5;
  };

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
            style={{ width: `${((count / generateMax(count)) * 100) > 100 ? 100 : (count / generateMax(count)) * 100}%`, backgroundColor: ((count / generateMax(count)) * 100) > 100 ? "#F52B00" : "#73bef2" }}
            className={classes.networkContainerBarItem}
          ></div>
        </div>
        <div className={classes.tierValue}>
          <span>{count || ""} profiles of {generateMax(count)} profiles used</span>
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

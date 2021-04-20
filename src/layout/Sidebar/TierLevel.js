import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import useStyles from "./styles/styles";
import SvgMaker from "../../components/svgMaker/SvgMaker";
import useLongPress from "../../components/useLongPressHook";
import { restricteModeAction } from "../../store/actions";
import { subscriptionConfig } from "../../pages/billing";

function TierLevel({ count, subscriptionName, maxProfiles }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  const [currentPlan, setCurrentPlan] = useState(null);

  const onLongPress = () => {
    dispatch(restricteModeAction(true));
  };

  const onClick = () => {
    history.push("/settings/billing");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 5000,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  useEffect(() => {
    const plan = subscriptionConfig.find((sub) => sub.id == dashboardPlan);
    setCurrentPlan(plan || { id: 0 });
  }, [dashboardPlan]);

  return (
    <>
      {currentPlan && <div className={classes.tierContainer}>
        {currentPlan.id != 0
          ? <>
            <div className={classes.tierHeader}>
              <div className={classes.tierIcon}>
                <SvgMaker fill="#7d8286" width={30} height={30} name='users'/>
              </div>
              <span>{currentPlan.title}</span>
            </div>
            {count && <>
              <div className={classes.barTrack}>
                <div
                  style={{ width: `${((count / currentPlan.unitsRange[1]) * 100) > 100 ? 100 : (count / currentPlan.unitsRange[1]) * 100}%`, backgroundColor: ((count / currentPlan.unitsRange[1]) * 100) > 100 ? "#F52B00" : "#73bef2" }}
                  className={classes.networkContainerBarItem}
                ></div>
              </div>
              <div className={classes.tierValue}>
                <span>{count || ""} profiles of {currentPlan.unitsRange[1]} profiles used</span>
              </div>
            </>}
            <div className={classes.tierLevelButtonWrapper}>
              <Button
                variant='outlined'
                classes={{ root: classes.tierButton }}
                onClick={() => history.push("/settings/billing")}
              >
                Upgrade Plan
              </Button>
              <button className={classes.longPressButton} {...longPressEvent}></button>
            </div>
          </>
          : <div className={classes.tierLevelButtonWrapper}>
            <Button
              variant='outlined'
              classes={{ root: classes.tierButton }}
              onClick={() => history.push("/settings/billing")}
            >
              Subscribe now
            </Button>
            <button className={classes.longPressButton} {...longPressEvent}></button>
          </div>}
      </div>}
    </>
  );
}

export default TierLevel;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import useStyles from "./styles/styles";
import useLongPress from "../../components/useLongPressHook";
import { restricteModeAction } from "../../store/actions";
import { subscriptionConfig } from "../../pages/billing";
import tierIcon from "../../assets/tierIcon.png";

function TierLevel({ count }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  const stripeQuantity = useSelector(({ systemReducer }) => systemReducer.setMeteredSubQuantity);
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
    if (dashboardPlan === "10" && !stripeQuantity) return;
    if (dashboardPlan === "10" && stripeQuantity) {
      plan.unitsRange = [0, stripeQuantity];
    }
    setCurrentPlan(plan || { id: 0 });
  }, [dashboardPlan, stripeQuantity]);

  return (
    <>
      {currentPlan && <div className={classes.tierContainer}>
        {currentPlan.id != 0
          ? <>
            <div className={classes.tierHeader}>
              {/* <div className={classes.tierIcon}>
                <SvgMaker fill="#000000" width={30} height={30} name='users'/>
                <img style={{ width: 22, height: 22 }} alt='popl' src={tierIcon} />
              </div> */}
              {/* <div className={classes.tierIcon}> */}
              {/* <SvgMaker fill="#000000" width={30} height={30} name='users'/> */}
              {/* <img style={{ width: 22, height: 22 }} alt='popl' src={tierIcon} /> */}
              {/* </div> */}
              <span>{currentPlan.title}</span>
            </div>
            {count && <>
              <div className={classes.barTrack}>
                <div
                  style={{ width: `${((count / currentPlan.unitsRange[1]) * 100) > 100 ? 100 : (count / currentPlan.unitsRange[1]) * 100}%`, backgroundColor: ((count / currentPlan?.unitsRange[1]) * 100) > 100 ? "#F52B00" : "#73bef2" }}
                  className={classes.networkContainerBarItem}
                ></div>
              </div>
              <div className={classes.tierValue}>
                {dashboardPlan == "10" && stripeQuantity === count
                  ? <span>{count} {count === 1 ? "account used" : "accounts used"}</span>
                  : <span>{count || ""} {count === 1 ? "account" : "accounts"} of {currentPlan.unitsRange[1]} accounts used</span>}
              </div>
            </>}
            {/*
            <div className={classes.tierLevelButtonWrapper}>
              <Button
                variant='outlined'
@@ -66,7 +67,8 @@ function TierLevel({ count }) {
                Upgrade Plan
              </Button>
              <button className={classes.longPressButton} {...longPressEvent}></button>
            </div>
          </div>
          */}
          </>
          : dashboardPlan === "10" && currentPlan.id === 0
            ? null
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

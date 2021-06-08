import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import SubscribeButton from "./SubscribeButton";
import SvgMaker from "../../../components/svgMaker/SvgMaker";

function SubscriptionCard({
  title, price, priceId, stripe, profilesNumber, quantity, unitsRange, subscriptionId, currentPlan,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {currentPlan && <div className={classes.currentPlan}>Current Plan</div>}
      <Typography className={classes.title} variant='body2'>{title}</Typography>
      <div className={classes.priceDescriptionContainer}>
        <span><span style={{ fontSize: 24 }}>${price}</span> month</span>
      </div>
      <div className={classes.buttonContainer}>
        <SubscribeButton priceId={priceId} stripe={stripe} quantity={quantity} unitsRange={unitsRange} title={title} subscriptionId={subscriptionId} />
      </div>
      <div className={classes.labelsContainer}>
        <div className={classes.labelsItem}>
          <div>
            <SvgMaker
              name='successCheckMark'
              width={20}
              height={20}
              fill="#32BA7C"
            />
          </div>
          <Typography variant='body2' classes={{ body2: classes.labelsItemsText }}>{profilesNumber} Accounts</Typography>
        </div>
        <div className={classes.labelsItem}>
          <div>
            <SvgMaker
              name='successCheckMark'
              width={20}
              height={20}
              fill="#32BA7C"
            />
          </div>
          <Typography variant='body2' classes={{ body2: classes.labelsItemsText }}>Popl Pro for all accounts</Typography>
        </div>
        <div className={classes.labelsItem}>
          <div>
            <SvgMaker
              name= {["Basic"].includes(title) ? "cancelIcon" : "successCheckMark"}
              width={20}
              height={20}
            />
          </div>
          <Typography variant='body2' classes={{ body2: classes.labelsItemsText }}>Free Custom Popls for your team</Typography>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCard;

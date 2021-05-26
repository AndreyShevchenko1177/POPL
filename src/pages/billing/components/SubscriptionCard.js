import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import SubscribeButton from "./SubscribeButton";

function SubscriptionCard({
  title, price, priceId, stripe, profilesNumber, quantity, unitsRange, subscriptionId, currentPlan,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {currentPlan && <div className={classes.currentPlan}>Current Plan</div>}
      <Typography className={classes.title} variant='body2'>{title}</Typography>
      <div className={classes.priceDescriptionContainer}>
        <Typography variant='body2'>{profilesNumber} Accounts</Typography>
        <span>${price} month</span>
      </div>
      <div className={classes.buttonContainer}>
        <SubscribeButton priceId={priceId} stripe={stripe} quantity={quantity} unitsRange={unitsRange} title={title} subscriptionId={subscriptionId} />
      </div>
      <div className={classes.labelsContainer}>
      </div>
    </div>
  );
}

export default SubscriptionCard;

import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import SubscribeButton from "./SubscribeButton";

function SubscriptionCard({
  title, price, priceId, stripe, profilesNumber, quantity, unitsRange,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant='body2'>{title}</Typography>
      <div className={classes.priceDescriptionContainer}>
        <Typography variant='body2'>{profilesNumber} Profiles</Typography>
        <span>${price} month</span>
        {/* <Typography variant='body2'>${price} / month</Typography> */}
      </div>
      <div className={classes.buttonContainer}>
        <SubscribeButton priceId={priceId} stripe={stripe} quantity={quantity} unitsRange={unitsRange} />
      </div>
      <div className={classes.labelsContainer}>
      </div>
    </div>
  );
}

export default SubscriptionCard;

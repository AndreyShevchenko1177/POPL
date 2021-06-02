import React from "react";
import { Button, Typography } from "@material-ui/core";
import useStyles from "./styles";
import SubscribeButton from "./SubscribeButton";

function SubscriptionCard({
  title, price, priceId, stripe, profilesNumber, quantity, unitsRange, subscriptionId, currentPlan, id,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {currentPlan && <div className={classes.currentPlan}>Current Plan</div>}
      <Typography className={classes.title} variant='body2'>{id !== 5 ? title : ""}</Typography>
      <div className={classes.priceDescriptionContainer}>
        {id !== 5
          ? <>
            <Typography variant='body2'>{profilesNumber} Accounts</Typography>
            <span>${price} month</span>
          </>
          : <Typography variant='body2'>More than 100 Accounts?</Typography>
        }
      </div>
      <div className={classes.buttonContainer}>
        {id !== 5
          ? <SubscribeButton priceId={priceId} stripe={stripe} quantity={quantity} unitsRange={unitsRange} title={title} subscriptionId={subscriptionId} />
          : <a href="mailto:jason@popl.co">
            <Button className={classes.subscriptionButton}>Contact Sales</Button>
          </a>
        }
      </div>
      <div className={classes.labelsContainer}>
      </div>
    </div>
  );
}

export default SubscriptionCard;

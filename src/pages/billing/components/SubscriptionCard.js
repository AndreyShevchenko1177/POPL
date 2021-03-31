import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import SvgMaker from "../../../components/svgMaker";
import SubscribeButton from "./SubscribeButton";
import successIcon from "../../../assets/svg/success-icon.svg";

function SubscriptionCard({
  title, price, priceId, stripe, labels, profilesNumber,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant='body2'>{title}</Typography>
      <div className={classes.priceDescriptionContainer}>
        <span>{profilesNumber} Profiles</span>
        {/* <span><b>${price} month</b></span> */}
        <Typography variant='body2'>${price} / month</Typography>
      </div>
      <div className={classes.buttonContainer}>
        <SubscribeButton priceId={priceId} stripe={stripe} />
      </div>
      <div className={classes.labelsContainer}>
        {labels.map((label) => (
          <div key={label} className={classes.labelsItem}>
            <div className={classes.labelIcon}>
              <SvgMaker name="successCheckMark" />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionCard;

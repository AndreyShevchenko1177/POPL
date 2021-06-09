import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import stripeConfig from "./stripeConfig";
import SubscriptionCard from "./components/SubscriptionCard";
import TwoWeeksFreeButton from "./components/TwoWeeksFreeButton";
import { profileIdsRequest } from "../profiles/store/actions/requests";

const stripe = window.Stripe && window.Stripe(stripeConfig.stripePk);

export const subscriptionConfig = [
  {
    id: 1,
    title: "Basic",
    price: "50",
    unitsRange: [1, 5],
    profilesNumber: "1-5",
    priceId: "price_1IpQTfJqkGKmOFO6pz9p6c2y",
  },
  {
    id: 2,
    title: "Growth",
    price: "150",
    unitsRange: [6, 20],
    profilesNumber: "6-20",
    priceId: "price_1IpQTfJqkGKmOFO6pz9p6c2y",
  },
  {
    id: 3,
    title: "Scale",
    price: "500",
    unitsRange: [21, 50],
    profilesNumber: "21-50",
    priceId: "price_1IpQTfJqkGKmOFO6pz9p6c2y",
  },
  {
    id: 4,
    title: "Enterprise",
    price: "1000",
    unitsRange: [51, 100],
    priceId: "price_1IpQTfJqkGKmOFO6pz9p6c2y",
    profilesNumber: "51-100",
  },
];

const twoWeeksFreePriceId = "price_1IyL7TJqkGKmOFO6hexjtWnF";

function Billing() {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(null);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);

  useEffect(() => {
    if (profiles) setQuantity(profiles.length);
  }, [profiles]);

  return (
    <>
      <Header
        rootLink="Settings"
        lastChild="Billing"
        path="/settings"
      />
      <div className={classes.container}>
        <div className={classes.titleWrapper}>
          <Typography variant="h1">Popl Enterprise Pricing</Typography>
        </div>
        <div className={classes.cardsContainerWrapper}>
          {/* <div className={classes.cardsContainerShadowBox}> */}
          <div className={classes.cardsContainer}>
            {subscriptionConfig.map(({
              id, title, price, priceId, profilesNumber, unitsRange,
            }) => (
              <div className={classes.cardItemContainer} key={id}>
                <SubscriptionCard
                  title={title}
                  price={price}
                  profilesNumber={profilesNumber}
                  priceId={priceId}
                  stripe={stripe}
                  quantity={unitsRange[1]}
                  unitsRange={unitsRange}
                  subscriptionId={id}
                  currentPlan={dashboardPlan == id}
                />
              </div>
            ))}
            <div className={classes.contactUsSection}>
              <Typography className={classes.contactUsTitle} variant='body2'>More than 100 Accounts?</Typography>
              <a href="mailto:jason@popl.co">
                <Button className={classes.contactSalesButton}>Contact Sales</Button>
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className={classes.footer}>
          <Typography variant="h3">Just want Popl Pro for your team?</Typography>
          <TwoWeeksFreeButton stripe={stripe} priceId={twoWeeksFreePriceId} quantity={quantity} />
          <span>Does not include dashboard functionality</span>
        </div>
      </div>
    </>
  );
}

export default Billing;

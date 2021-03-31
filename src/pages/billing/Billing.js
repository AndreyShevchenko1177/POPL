import React from "react";
import { Button, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import stripeConfig from "./stripeConfig";
import SubscriptionCard from "./components/SubscriptionCard";

const stripe = window.Stripe(stripeConfig.stripePk);

const config = [
  {
    id: 1,
    title: "Basic",
    price: "50",
    profilesNumber: "1-5",
    priceId: "price_1IYcU1JqkGKmOFO6oJH5I0FR",
    labels: ["Connect Portal", "1000 Connected Users", "Visual Workflow Builder", "Webhook Triggers", "Connect API"],
  },
  {
    id: 2,
    title: "Growth",
    price: "100",
    profilesNumber: "6-20",
    priceId: "price_1IYcU1JqkGKmOFO6oJH5I0FR",
    labels: ["Connect Portal", "1000 Connected Users", "Visual Workflow Builder", "Webhook Triggers", "Connect API"],
  },
  {
    id: 3,
    title: "Enterprise",
    price: "300",
    priceId: "price_1IYcU1JqkGKmOFO6oJH5I0FR",
    profilesNumber: "21-100",
    labels: ["Connect Portal", "1000 Connected Users", "Visual Workflow Builder", "Webhook Triggers", "Connect API"],
  },
];

function Billing() {
  const classes = useStyles();

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
          {/* <div className={classes.mostPopular}>
            Most Popular
          </div> */}
          <div className={classes.cardsContainer}>
            {config.map(({
              id, title, price, priceId, labels, profilesNumber,
            }) => (
              <div className={classes.cardItemContainer} key={id}>
                <SubscriptionCard
                  title={title}
                  price={price}
                  profilesNumber={profilesNumber}
                  priceId={priceId}
                  stripe={stripe}
                  labels={labels}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.footer}>
          <Typography variant="body1">More than 100 Profiles?</Typography>
          <Button className={classes.contactSalesButton}>Contact Sales</Button>
        </div>
      </div>
    </>
  );
}

export default Billing;

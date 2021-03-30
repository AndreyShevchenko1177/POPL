import React from "react";
import { Typography } from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import stripeConfig from "./stripeConfig";
import SubscriptionCard from "./components/SubscriptionCard";

const stripe = window.Stripe(stripeConfig.stripePk);

const config = [
  {
    id: 1,
    title: "Pro",
    price: "50",
    priceId: "price_1IYcU1JqkGKmOFO6oJH5I0FR",
    labels: ["Connect Portal", "1000 Connected Users", "Visual Workflow Builder", "Webhook Triggers", "Connect API"],
  },
  {
    id: 2,
    title: "Basic",
    price: "150",
    priceId: "price_1IYcU1JqkGKmOFO6oJH5I0FR",
    labels: ["Connect Portal", "1000 Connected Users", "Visual Workflow Builder", "Webhook Triggers", "Connect API"],
  },
  {
    id: 3,
    title: "Custom",
    price: "50",
    priceId: "price_1IYcU1JqkGKmOFO6oJH5I0FR",
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
          <Typography variant="h1">Popls Connect Pricing</Typography>
        </div>
        <div className={classes.cardsContainerWrapper}>
          <div className={classes.mostPopular}>
            Most Popular
          </div>
          <div className={classes.cardsContainer}>
            {config.map(({
              id, title, price, priceId, labels,
            }) => (
              <div className={classes.cardItemContainer} key={id}>
                <SubscriptionCard
                  title={title}
                  price={price}
                  priceId={priceId}
                  stripe={stripe}
                  labels={labels}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;

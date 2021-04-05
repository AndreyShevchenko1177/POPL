import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import Header from "../../components/Header";
import useStyles from "./styles";
import stripeConfig from "./stripeConfig";
import SubscriptionCard from "./components/SubscriptionCard";
import { profileIds } from "../profiles/store/actions/requests";

const stripe = window.Stripe(stripeConfig.stripePk);

const config = [
  {
    id: 1,
    title: "Basic",
    price: "50",
    unitsRange: [1, 5],
    profilesNumber: "1-5",
    priceId: "price_1IaoWqJqkGKmOFO6aBcx3yWz",
  },
  {
    id: 2,
    title: "Growth",
    price: "100",
    unitsRange: [6, 20],
    profilesNumber: "6-20",
    priceId: "price_1IaoWqJqkGKmOFO6aBcx3yWz",
  },
  {
    id: 3,
    title: "Enterprise",
    price: "300",
    unitsRange: [21, 100],
    priceId: "price_1IaoWqJqkGKmOFO6aBcx3yWz",
    profilesNumber: "21-100",
  },
];

function Billing() {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(null);
  const userId = useSelector(({ authReducer }) => authReducer.signIn.data.id);

  useEffect(() => {
    profileIds(userId)
      .then((res) => (res.data ? setQuantity(JSON.parse(res.data).length + 1) : setQuantity(1)))
      .catch((err) => setQuantity(null));
  });

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
              id, title, price, priceId, profilesNumber, unitsRange,
            }) => (
              <div className={classes.cardItemContainer} key={id}>
                <SubscriptionCard
                  title={title}
                  price={price}
                  profilesNumber={profilesNumber}
                  priceId={priceId}
                  stripe={stripe}
                  quantity={quantity}
                  unitsRange={unitsRange}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.footer}>
          <Typography variant="h3">More than 100 Profiles?</Typography>
          <a href="mailto:jason@popl.co">
            <Button className={classes.contactSalesButton}>Contact Sales</Button>
          </a>

        </div>
      </div>
    </>
  );
}

export default Billing;

import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../store/actions";
import Header from "../../components/Header";
import useStyles from "./styles";
import stripeConfig from "./stripeConfig";

const stripe = window.Stripe(stripeConfig.stripePk);

function Billing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const priceId = "price_1IQekxCcIG0MPJSGYInKIsnv";

  const handleSubscribe = async () => {
    const checkoutSession = await axios.post(stripeConfig.getSessionIdUrl, { priceId });
    stripe.redirectToCheckout({ sessionId: checkoutSession.data.sessionId })
      .then((res) => console.log(res))
      .catch((err) => dispatch(
        snackBarAction({
          message: "Subscription error",
          severity: "error",
          duration: 3000,
          open: true,
        }),
      ));
  };

  return (
    <>
      <Header
        rootLink="Settings"
        firstChild="Billing"
        path="/settings"
      />
      <div className={classes.container}>
        <Button
          variant='outlined'
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </div>
    </>
  );
}

export default Billing;

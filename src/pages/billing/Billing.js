import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../store/actions";
import Header from "../../components/Header";
import useStyles from "./styles";
import stripeConfig from "./stripeConfig";
import { setCookie } from "../../utils/cookie";

const stripe = window.Stripe(stripeConfig.stripePk);

function Billing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const priceId = "price_1ISSQWJqkGKmOFO6CkFFev2H";

  const handleSubscribe = async () => {
    const checkoutSession = await axios.post(stripeConfig.getSessionIdUrl, { priceId });
    setCookie("sessionId", checkoutSession.data.sessionId);
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
import React from "react";
import { Button } from "@material-ui/core";
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
  const priceId = "price_1ITEbeJqkGKmOFO6wOC23z5v";

  const handleSubscribe = async () => {
    let myHeaders = new Headers();

    let formdata = new FormData();
    formdata.append("sAction", "CheckoutSessionStripe");
    formdata.append("sPriceId", priceId);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("/api", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCookie("sessionId", result);
        stripe.redirectToCheckout({ sessionId: result })
          .then((res) => console.log(res))
          .catch((err) => dispatch(
            snackBarAction({
              message: "Subscription error",
              severity: "error",
              duration: 3000,
              open: true,
            }),
          ));
      })
      .catch((error) => dispatch(
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
        lastChild="Billing"
        path="/settings"
      />
      <div className={classes.container}>
        <Button
          variant='outlined'
          onClick={handleSubscribe}
        >
          Maki all profiles pro
        </Button>
      </div>
    </>
  );
}

export default Billing;

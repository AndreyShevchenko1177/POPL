import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { snackBarAction } from "../../../store/actions";
import { setCookie } from "../../../utils/cookie";
import useStyles from "./styles";
import { scale250PriceId } from "../Billing";

function checkoutSessionWithoutTrial(priceId) {
  let formdata = new FormData();
  formdata.append("sAction", "CheckoutSessionStripeNewPricing");
  formdata.append("sPriceId", priceId);
  return formdata;
}

function checkoutSessionWithTrial(priceId, quantity) {
  let formdata = new FormData();
  formdata.append("sAction", "CheckoutSessionStripe");
  formdata.append("sPriceId", priceId);
  formdata.append("sQuantity", quantity);
  formdata.append("sTrial", 14);
  return formdata;
}

function SubscribeButton({
  priceId, stripe, quantity, unitsRange, title, subscriptionId, newBilling, profilesQuantity, userId,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    const price = subscriptionId === 3 && ["4294972146", "4294970999"].includes(userId) ? scale250PriceId : priceId;
    let myHeaders = new Headers();

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: quantity ? checkoutSessionWithTrial(price, quantity) : checkoutSessionWithoutTrial(priceId),
      redirect: "follow",
    };

    fetch("/api", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setCookie("sessionId", JSON.stringify({
          id: result, quantity: profilesQuantity, pricingName: title, subscriptionId, unitsRange, isNewBilling: !!newBilling,
        }));
        console.log(quantity);
        stripe.redirectToCheckout({ sessionId: result })
          .then((res) => console.log(res))
          .catch((err) => dispatch(
            snackBarAction({
              message: "Subscription error",
              severity: "error",
              duration: 6000,
              open: true,
            }),
          ));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            message: "Subscription error",
            severity: "error",
            duration: 6000,
            open: true,
          }),
        );
      });
  };

  return (
    <>
      <Button
        className={classes.subscriptionButton}
        onClick={handleSubscribe}
      >
        {newBilling ? "Try 1 month free" : "Try 2 Weeks Free"}
      </Button>
    </>
  );
}

export default SubscribeButton;

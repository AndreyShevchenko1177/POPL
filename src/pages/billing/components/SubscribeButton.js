import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { snackBarAction } from "../../../store/actions";
import { setCookie } from "../../../utils/cookie";
import useStyles from "./styles";

function SubscribeButton({
  priceId, stripe, quantity, unitsRange, title, subscriptionId,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    let myHeaders = new Headers();

    let formdata = new FormData();
    formdata.append("sAction", "CheckoutSessionStripe");
    formdata.append("sPriceId", priceId);
    formdata.append("sQuantity", quantity);
    formdata.append("sTrial", 30);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("/api", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setCookie("sessionId", JSON.stringify({
          id: result, pricingName: title, subscriptionId, unitsRange,
        }));
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
        Try 1 Month Free
      </Button>
    </>
  );
}

export default SubscribeButton;

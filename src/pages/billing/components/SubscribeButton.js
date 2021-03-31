import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { snackBarAction } from "../../../store/actions";
import { setCookie } from "../../../utils/cookie";
import useStyles from "./styles";

function SubscribeButton({ priceId, stripe, quantity }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    let myHeaders = new Headers();

    let formdata = new FormData();
    formdata.append("sAction", "CheckoutSessionStripe");
    formdata.append("sPriceId", priceId);
    formdata.append("sQuantity", quantity);

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
      <Button
        className={classes.subscriptionButton}
        onClick={handleSubscribe}
      >
        Subscribe
      </Button>
    </>
  );
}

export default SubscribeButton;

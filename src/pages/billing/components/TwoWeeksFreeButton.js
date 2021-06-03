import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { snackBarAction } from "../../../store/actions";
import { setCookie } from "../../../utils/cookie";
import useStyles from "./styles";

function TwoWeeksFreeButton({
  priceId, stripe, quantity,
}) {
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
        setCookie("sessionId", JSON.stringify({
          id: result,
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
        className={classes.makeJustProButton}
        onClick={handleSubscribe}
        variant='contained'
        color='primary'
      >
        Try 2 Weeks Free
      </Button>
    </>
  );
}

export default TwoWeeksFreeButton;

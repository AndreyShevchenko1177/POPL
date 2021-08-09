import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import successIcon from "../../assets/svg/success-icon.svg";
import useStyles from "./styles/styles";
import { deleteCookies, getCookie } from "../../utils/cookie";
import { setStripeCustomer } from "./store/requests";
import { snackBarAction } from "../../store/actions";

export const SuccessPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);

  useEffect(() => {
    const timer = setTimeout(() => history.push("/accounts"), 5000);
    const { subscriptionId, quantity, isNewBilling } = JSON.parse(getCookie("sessionId"));
    if (subscriptionId) {
      const bodyFormData = new FormData();
      bodyFormData.append("sAction", "SetDashboardPlan");
      bodyFormData.append("ajax", 1);
      bodyFormData.append("iID", userData.id);
      bodyFormData.append("iPlan", subscriptionId);
      axios.post("", bodyFormData, {
        withCredentials: true,
      });
    }

    setStripeCustomer(params.sessionId, userData.id, quantity, isNewBilling, (message) => dispatch(snackBarAction({
      message,
      severity: "error",
      duration: 6000,
      open: true,
    })));

    return () => {
      clearTimeout(timer);
      deleteCookies("sessionId");
    };
  }, []);

  return (
    <>
      {JSON.parse(getCookie("sessionId")).id === params.sessionId ? (
        <div className={classes.container}>
          <img className={classes.icon} alt="success" src={successIcon} />
          <p className={classes.resultText}>Payment Successful</p>
          <a href="/" className={classes.backPageText}>
            You will be redirected back to your dashboard in 5 seconds
          </a>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

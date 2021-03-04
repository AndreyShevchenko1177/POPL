import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import errorIcon from "../../assets/svg/error-icon.svg";
import useStyles from "./styles/styles";

export const ErrorPage = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => history.push("/settings/billing"), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
        <div className={classes.container}>
            <img className={classes.icon} alt='error' src={errorIcon} />
            <p className={classes.resultText}>Your payment failed</p>
            <a href='/' className={classes.backPageText}>
                Back to payment form or you automatically redirect backward during 5 seconds
            </a>
        </div>
  );
};

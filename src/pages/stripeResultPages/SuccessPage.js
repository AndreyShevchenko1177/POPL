import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import successIcon from "../../assets/svg/success-icon.svg";
import useStyles from "./styles/styles";

export const SuccessPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    // const timer = setTimeout(() => history.push("/settings/billing"), 5000);
    console.log(params);
    return () => {
      // clearTimeout(timer);
    };
  }, []);

  return (
        <div className={classes.container}>
            <img className={classes.icon} alt='success' src={successIcon} />
            <p className={classes.resultText}>Your payment successfully</p>
            <a href='/' className={classes.backPageText}>
                Back to payment form or you automatically redirect backward during 5 seconds
            </a>
        </div>
  );
};

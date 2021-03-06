import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import errorIcon from "../../assets/svg/error-icon.svg";
import useStyles from "./styles/styles";
import { deleteCookies, getCookie } from "../../utils/cookie";

export const ErrorPage = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [time, setTime] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      clearInterval(interval);
      history.push("/settings/billing");
    }, 6000);

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }, []);

  useEffect(
    () => () => {
      deleteCookies("sessionId");
    },
    [],
  );

  return (
    <>
      {getCookie("sessionId") === params.sessionId ? (
        <div className={classes.container}>
          <img className={classes.icon} alt="error" src={errorIcon} />
          <p className={classes.resultText}>Subscription payment cancelled</p>
          <a href="/" className={classes.backPageText}>
            You will be directed back automatically in {time} seconds
          </a>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

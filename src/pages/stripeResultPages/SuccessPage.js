import React, { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import successIcon from "../../assets/svg/success-icon.svg";
import useStyles from "./styles/styles";
import { deleteCookies, getCookie } from "../../utils/cookie";
import { setUserProAction } from "./store/actions";

export const SuccessPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);

  useEffect(() => {
    const timer = setTimeout(() => history.push("/settings/billing"), 5000);
    dispatch(setUserProAction(userData.id));
    return () => {
      clearTimeout(timer);
      deleteCookies("sessionId");
    };
  }, []);

  return (
    <>
      {getCookie("sessionId") === params.sessionId ? (
        <div className={classes.container}>
          <img className={classes.icon} alt="success" src={successIcon} />
          <p className={classes.resultText}>Your payment successfully</p>
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

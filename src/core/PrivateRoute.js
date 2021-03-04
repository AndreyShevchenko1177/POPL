import React from "react";
import { Redirect, Route } from "react-router-dom";
import Main from "../layout/Main";

export default function PrivateRoute(props) {
  const {
    children, path, isLoggedIn, stripe, computedMatch, ...rest
  } = props;

  return (
    <>
      <Main stripe={stripe}>
        {isLoggedIn ? (
          <Route path={path} {...rest}>
            {children}
          </Route>
        ) : (
          <Redirect to="/sign-in" />
        )}
      </Main>
    </>
  );
}

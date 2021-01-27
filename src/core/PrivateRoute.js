import React from "react";
import Main from "../layout/Main";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute(props) {
  const { children, path, isLoggedIn, ...rest } = props;
  // const isLoggedIn = true;
  return (
    <>
      <Main>
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

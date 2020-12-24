import Main from "layout/Main";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute(props) {
  const { children, path, ...rest } = props;
  const isLoggedIn = true;
  return (
    <>
      <Main>
        {isLoggedIn ? (
          <Route path={path} {...rest}>
            {children}
          </Route>
        ) : (
          <Redirect to="/login" />
        )}
      </Main>
    </>
  );
}

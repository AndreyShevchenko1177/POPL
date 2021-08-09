/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { SIGN_IN_SUCCESS, IS_SIGN_ACTION } from "../pages/auth/store/actionTypes";

const middleware = [thunk];
const composeEnhancers = (process.env.NODE_ENV !== "production"
  && typeof window !== "undefined"
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware)),
);

if (localStorage.profileData) {
  const payload = { ...JSON.parse(localStorage.profileData) };
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload,
  });
  // set isSign false to indicate that payload form localstorage not after sign in action
  store.dispatch({
    type: IS_SIGN_ACTION,
    payload: false,
  });
}

export default store;

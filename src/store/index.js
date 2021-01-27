import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { SIGN_IN_SUCCESS } from "../pages/auth/store/actionTypes";

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
);

if (localStorage.profileData) {
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: JSON.parse(localStorage.profileData),
  });
}

export default store;

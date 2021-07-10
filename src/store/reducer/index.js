import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../../pages/auth/store/reducer";
import forgotPasswordReducer from "../../pages/forgotPassword/store/reducer";
import profilesReducer from "../../pages/profiles/store/reducer";
import systemReducer from "./systemReducer";
import poplsReducer from "../../pages/popls/store/reducer";
import realTimeAnalytics from "../../pages/overallAnalytics/store/reducer";
import connectionsReducer from "../../pages/connections/store/reducer";
import stripeResult from "../../pages/stripeResultPages/store/reducer";
import loginExistingReducer from "../../pages/loginExistingProfile/store/reducer";
import createNewAccountReducer from "../../pages/createNewAccount/store/reducer";
import createAccountByEmailInvite from "../../pages/createAccountByEmailInvite/store/reducer";
import generalSettingsReducer from "../../pages/generalSettings/store/reducer";
import dashboardReducer from "../../pages/dashboard/store/reducer";
import { LOGOUT } from "../../pages/auth/store/actionTypes";

const appReducer = combineReducers({
  form: formReducer,
  authReducer,
  forgotPasswordReducer,
  profilesReducer,
  systemReducer,
  poplsReducer,
  realTimeAnalytics,
  connectionsReducer,
  stripeResult,
  loginExistingReducer,
  createNewAccountReducer,
  createAccountByEmailInvite,
  generalSettingsReducer,
  dashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

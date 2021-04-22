import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../../pages/auth/store/reducer";
import profilesReducer from "../../pages/profiles/store/reducer";
import systemReducer from "./systemReducer";
import poplsReducer from "../../pages/popls/store/reducer";
import realTimeAnalytics from "../../pages/overallAnalytics/store/reducer";
import connectionsReducer from "../../pages/connections/store/reducer";
import stripeResult from "../../pages/stripeResultPages/store/reducer";
import addProfilesReducer from "../../pages/addExistingProfile/store/reducer";
import newProfileReducer from "../../pages/addNewProfile/store/reducer";
import { LOGOUT } from "../../pages/auth/store/actionTypes";

const appReducer = combineReducers({
  form: formReducer,
  authReducer,
  profilesReducer,
  systemReducer,
  poplsReducer,
  realTimeAnalytics,
  connectionsReducer,
  stripeResult,
  addProfilesReducer,
  newProfileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

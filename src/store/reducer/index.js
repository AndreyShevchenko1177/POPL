import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../../pages/auth/store/reducer";
import profilesReducer from "../../pages/profiles/store/reducer";
import systemReducer from "./systemReducer";
import poplsReducer from "../../pages/popls/store/reducer";
import realTimeAnalytics from "../../pages/realTimeAnalytics/store/reducer";
import connectionsReducer from "../../pages/connections/store/reducer";
import stripeResult from "../../pages/stripeResultPages/store/reducer";
import addProfilesReducer from "../../pages/newProfile/store/reducer";

export default combineReducers({
  form: formReducer,
  authReducer,
  profilesReducer,
  systemReducer,
  poplsReducer,
  realTimeAnalytics,
  connectionsReducer,
  stripeResult,
  addProfilesReducer,
});

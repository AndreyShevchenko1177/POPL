import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../../pages/auth/store/reducer";
import poplsReducer from "../../pages/popls/store/reducer";
import systemReducer from "./systemReducer";

export default combineReducers({
  form: formReducer,
  authReducer,
  poplsReducer,
  systemReducer,
});

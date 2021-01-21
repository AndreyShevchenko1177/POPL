import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../../pages/auth/sign-in/store/reducer";
import poplsReducer from "../../pages/popls/store/reducer";

export default combineReducers({
  form: formReducer,
  authReducer,
  poplsReducer,
});

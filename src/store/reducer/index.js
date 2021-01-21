import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "../../pages/auth/store/reducer";

export default combineReducers({
  form: formReducer,
  authReducer,
});

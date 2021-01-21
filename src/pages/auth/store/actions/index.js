import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from "../actionTypes";

export const signInAction = (error, credo) => async (dispatch) => {
  try {
    if (error) return;
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.email);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("sAction", "Auth");
    bodyFormData.append("ajax", 1);

    const { data } = await axios.post("", bodyFormData);
    return dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: error,
    });
  }
};

export const signUpAction = (error, credo) => async (dispatch) => {
  try {
    if (error) return;
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.email);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("Name", credo.username);
    bodyFormData.append("sAction", "SaveMember");
    bodyFormData.append("ajax", 1);

    const { data } = await axios.post("", bodyFormData);
    if (!data.success) {
      return dispatch({
        type: SIGN_UP_FAIL,
        payload: error,
      });
    }
    return dispatch(
      signInAction(false, {
        email: credo.email,
        password: credo.password,
      })
    );
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: error,
    });
  }
};

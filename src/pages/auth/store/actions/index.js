import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
} from "../actionTypes";

export const signInAction = (credo) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.username);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("sAction", "Auth");
    bodyFormData.append("ajax", 1);

    const { data } = await axios.post("", bodyFormData);
    if (!data.success) {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: true,
      });
    }

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

export const signUpAction = (credo) => async (dispatch) => {
  try {
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
        payload: data.success,
      });
    }

    console.log(data.success);
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: error,
    });
  }
};

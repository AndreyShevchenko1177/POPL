import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from "../actionTypes";

export const signInAction = (credo) => async (dispatch) => {
  try {
    console.log(credo);
    // const result = await axios.post('...', { credo });
    return dispatch({
      type: SIGN_IN_SUCCESS,
      payload: "success",
      name: "sign-in",
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: error,
      name: "sign-in",
    });
  }
};

export const signUpAction = (credo) => async (dispatch) => {
  try {
    console.log(credo);
    // const result = await axios.post('...', { credo });
    return dispatch({
      type: SIGN_UP_SUCCESS,
      payload: "success",
      name: "sign-up",
    });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: error,
      name: "sign-up",
    });
  }
};

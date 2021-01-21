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
    console.log(credo);
    // const result = await axios.post('...', { credo });
    return dispatch({
      type: SIGN_IN_SUCCESS,
      payload: "success",
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
    // const result = await axios.post('...', { credo });
    if (error) return;
    return dispatch(
      signInAction(false, {
        userName: credo.username,
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

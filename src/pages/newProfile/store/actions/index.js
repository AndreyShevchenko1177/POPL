import axios from "axios";
import { snackBarAction } from "../../../../store/actions";
import {
  ADD_CHILD_PROFILE_SUCCESS,
  ADD_CHILD_PROFILE_FAIL,
  SIGN_IN_CHILD_SUCCESS,
  SIGN_IN_CHILD_FAIL,
  CLEAR_STATE,
} from "../actionTypes";

export const addChildProfileAction = (userId, childId) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "addChild");
    bodyFormData.append("iID", userId);
    bodyFormData.append("sChild", `[${childId}]`);
    const response = await axios.post("", bodyFormData, {
      withCredentials: true,
    });

    return dispatch({
      type: ADD_CHILD_PROFILE_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
    return dispatch({
      type: ADD_CHILD_PROFILE_FAIL,
      payload: error,
    });
  }
};

export const signInChildAction = (credo) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.email);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("sAction", "Auth");
    bodyFormData.append("ajax", 1);
    const { data } = await axios.post("", bodyFormData);
    if (!data.success) {
      dispatch(
        snackBarAction({
          message: "Sign in fail",
          severity: "error",
          duration: 3000,
          open: true,
        }),
      );
      return dispatch({
        type: SIGN_IN_CHILD_FAIL,
        payload: true,
      });
    }

    return dispatch({
      type: SIGN_IN_CHILD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_CHILD_FAIL,
      payload: error,
    });

    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
  }
};

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});
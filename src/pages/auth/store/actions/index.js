import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  GET_DASHBOARD_PLAN_SUCCESS,
  IS_SIGN_ACTION,
  CLEAN_STATE,
  LOGOUT,
} from "../actionTypes";
import { snackBarAction } from "../../../../store/actions";
import * as requests from "./requests";

export const signInAction = (credo) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.username);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("sAction", "Auth");
    bodyFormData.append("ajax", 1);
    const { data } = await axios.post("", bodyFormData);
    if (!data.success) {
      return dispatch({
        type: SIGN_IN_FAIL,
        payload: true,
      });
    }

    return dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { ...data, name: data.name.replace(/[\\]/g, "") },
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAIL,
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

export const signUpAction = (credo) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.email);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("sName", credo.username);
    bodyFormData.append("sAction", "SaveMember");
    bodyFormData.append("ajax", 1);

    const { data } = await axios.post("", bodyFormData);
    if (!data.success) {
      return dispatch({
        type: SIGN_UP_FAIL,
        payload: data,
      });
    }

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
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

export const getDashboardPlanAction = (id) => async (dispatch) => {
  try {
    const { data } = await requests.dashboardPlanRequest(id);
    return dispatch({
      type: GET_DASHBOARD_PLAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setIsSignAction = (isSign) => ({
  type: IS_SIGN_ACTION,
  payload: isSign,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const cleanAction = (name) => ({
  type: CLEAN_STATE,
  payload: name,
});

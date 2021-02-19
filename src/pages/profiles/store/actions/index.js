import axios from "axios";
import mockData from "./mockData";
import { snackBarAction } from "../../../../store/actions";

import {
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  ADD_PROFILES_SUCCESS,
  ADD_PROFILES_FAIL,
  EDIT_PROFILES_SUCCESS,
  EDIT_PROFILES_FAIL,
  GET_DATA_PROFILES_SUCCESS,
} from "../actionTypes";

export const getPoplsAction = () => async (dispatch) => {
  try {
    const getPopolsFormData = new FormData();
    getPopolsFormData.append("sAction", "GetPopls");
    getPopolsFormData.append("ajax", 1);

    const response = await axios.post("", getPopolsFormData, {
      withCredentials: true,
    });

    return dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: mockData.get,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: mockData.get,
    });
  }
};

export const addPoplAction = (proplData) => async (dispatch, getState) => {
  try {
    const { id, url } = getState().authReducer.signIn.data;
    const addPoplsFormData = new FormData();
    addPoplsFormData.append("sAction", "AddPopl");
    addPoplsFormData.append("sName", proplData?.name || "Profile4");
    addPoplsFormData.append("sSlug", url && "testing");
    addPoplsFormData.append("iMemberID", id);
    addPoplsFormData.append("ajax", 1);

    const data = await axios.post("", addPoplsFormData, {
      withCredentials: true,
    });
    return dispatch({
      type: ADD_PROFILES_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: ADD_PROFILES_FAIL,
      payload: error,
    });

    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      })
    );
  }
};

export const editPoplAction = (proplData) => async (dispatch, getState) => {
  try {
    const { id, url } = getState().authReducer.signIn.data;
    const updatePoplsFormData = new FormData();
    updatePoplsFormData.append("sAction", "UpdatePopl");
    updatePoplsFormData.append("sName", proplData?.name || "Profile4");
    updatePoplsFormData.append("sSlug", url && "testing");
    updatePoplsFormData.append("iMemberID", id);
    updatePoplsFormData.append("ajax", 1);

    const data = await axios.post("", updatePoplsFormData, {
      withCredentials: true,
    });
    return dispatch({
      type: EDIT_PROFILES_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: EDIT_PROFILES_FAIL,
      payload: error,
    });

    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      })
    );
  }
};

export const getProfileAction = () => async (dispatch) => {
  const updatePoplsFormData = new FormData();
  updatePoplsFormData.append("sAction", "EditProfile");
  updatePoplsFormData.append("ajax", 1);
  const response = await axios.post("", updatePoplsFormData, {
    withCredentials: true,
  });
  return dispatch({
    type: GET_DATA_PROFILES_SUCCESS,
    payload: response.data,
  });
};

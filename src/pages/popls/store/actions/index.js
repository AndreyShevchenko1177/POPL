import axios from "axios";

import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";

export const getPoplsAction = () => async (dispatch) => {
  try {
    const getPopolsFormData = new FormData();
    getPopolsFormData.append("sAction", "GetPopls");
    getPopolsFormData.append("ajax", 1);

    const response = await axios.post("", getPopolsFormData, {
      withCredentials: true,
    });
    if (typeof response === "string") {
      return dispatch(
        snackBarAction({
          message: "Download popls error",
          severity: "error",
          duration: 3000,
          open: true,
        })
      );
    }
    return dispatch({
      type: GET_POPLS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POPLS_FAIL,
      payload: error,
    });
  }
};

export const addPoplAction = (body) => async (dispatch) => {
  try {
    const addPoplsFormData = new FormData();
    addPoplsFormData.append("sAction", "AddPopl");
    addPoplsFormData.append("sName", body.name);
    addPoplsFormData.append("sSlug", body.slug);
    addPoplsFormData.append("iMemberID", body.mid);
    addPoplsFormData.append("ajax", 1);

    const response = await axios.post("", addPoplsFormData, {
      withCredentials: true,
    });
    if (typeof response === "string") {
      return dispatch(
        snackBarAction({
          message: "Add popls error",
          severity: "error",
          duration: 3000,
          open: true,
        })
      );
    }
    dispatch(getPoplsAction());
    return dispatch({
      type: ADD_POPLS_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: ADD_POPLS_FAIL,
      payload: error,
    });
  }
};

export const editPoplAction = (body) => async (dispatch) => {
  try {
    const updatePoplsFormData = new FormData();
    updatePoplsFormData.append("sAction", "UpdatePopl");
    updatePoplsFormData.append("sName", body.name);
    updatePoplsFormData.append("sSlug", body.slug);
    updatePoplsFormData.append("iMemberID", body.mid);
    updatePoplsFormData.append("iID", body.id);
    updatePoplsFormData.append("ajax", 1);

    const response = await axios.post("", updatePoplsFormData, {
      withCredentials: true,
    });
    if (typeof response === "string") {
      return dispatch(
        snackBarAction({
          message: "Edit popls error",
          severity: "error",
          duration: 3000,
          open: true,
        })
      );
    }
    dispatch(getPoplsAction());
    return dispatch({
      type: EDIT_POPLS_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: EDIT_POPLS_FAIL,
      payload: error,
    });
  }
};

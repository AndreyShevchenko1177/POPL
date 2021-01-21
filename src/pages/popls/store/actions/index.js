import axios from "axios";
import mockData from "./mockData";

import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPL_SUCCESS,
  ADD_POPL_FAIL,
  EDIT_POPL_SUCCESS,
  EDIT_POPL_FAIL,
} from "../actionTypes";

export const getPoplsAction = () => async (dispatch) => {
  try {
    // LOGIN
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", "popovmaksim7415@gmail.com");
    bodyFormData.append("sPassword", "password1Q!");
    bodyFormData.append("sAction", "Auth");
    bodyFormData.append("ajax", 1);

    const { data } = await axios.post("https://poplme.co/", bodyFormData, {
      // withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
      // data: bodyFormData,
    });
    // =================================

    // SETTING COOKIE
    document.cookie = `l_i=${data["l_i"].value}; path=/`;
    document.cookie = `l_t=${data["l_t"].value}; path=/`;
    console.log(document.cookie);
    // ===================================

    // NEXT REQUEST WITH NEW COOKIE
    const getPopolsFormData = new FormData();
    getPopolsFormData.append("sAction", "GetPopol");
    getPopolsFormData.append("ajax", 1);

    const response = await axios.post("https://poplme.co/", getPopolsFormData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // =========================

    return dispatch({
      type: GET_POPLS_SUCCESS,
      payload: mockData.get,
    });
  } catch (error) {
    dispatch({
      type: GET_POPLS_SUCCESS,
      payload: mockData.get,
    });
  }
};

export const addPoplAction = (data) => async (dispatch) => {
  try {
    return dispatch({
      type: ADD_POPL_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: ADD_POPL_FAIL,
      payload: error,
    });
  }
};

export const editPoplAction = (data) => async (dispatch) => {
  try {
    return dispatch({
      type: EDIT_POPL_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: EDIT_POPL_FAIL,
      payload: error,
    });
  }
};

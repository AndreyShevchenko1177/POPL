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
    // =================================

    // SETTING COOKIE
    // document['Set-Cookie'] = `l_i=${data["l_i"].value}; path=/; SameSite=None; Domain=poplme.co/`;
    // document['Set-Cookie'] = `l_t=${data["l_t"].value}; path=/; SameSite=None; Domain=poplme.co/`;
    // console.log(document['Set-Cookie']);
    // ===================================

    // NEXT REQUEST WITH NEW COOKIE

    const getPopolsFormData = new FormData();
    getPopolsFormData.append("sAction", "GetPopol");
    getPopolsFormData.append("ajax", 1);

    const response = await axios.post("", getPopolsFormData, {
      withCredentials: true,
    });
    // =========================

    return dispatch({
      type: GET_POPLS_SUCCESS,
      payload: mockData.get,
    });
  } catch (error) {
    dispatch({
      type: GET_POPLS_FAIL,
      payload: error,
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

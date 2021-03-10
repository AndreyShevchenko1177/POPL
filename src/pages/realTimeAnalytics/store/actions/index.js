import axios from "axios";

import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_LINKTAPS_SUCCESS, GET_LINKTAPS_FAIL,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";

export const getPopsAction = (id) => async (dispatch) => {
  try {
    const getPopsFormData = new FormData();
    getPopsFormData.append("sAction", "AjaxGetPops");
    getPopsFormData.append("pid", Number(id));
    getPopsFormData.append("ajax", 1);

    const response = await axios.post("", getPopsFormData, {
      withCredentials: true,
    });
    if (typeof response === "string") {
      dispatch(
        snackBarAction({
          message: "Download pops error",
          severity: "error",
          duration: 3000,
          open: true,
        }),
      );
      return dispatch({
        type: GET_POPS_FAIL,
        payload: "error",
      });
    }
    return dispatch({
      type: GET_POPS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POPS_FAIL,
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

export const getLinkTapsSuccess = (profiles) => (dispatch) => {
  let result = 0;
  profiles.forEach((el) => {
    result += (el.social?.length || 0) + (el.business?.length || 0);
  });
  return dispatch({
    type: GET_LINKTAPS_SUCCESS,
    data: result,
  });
};

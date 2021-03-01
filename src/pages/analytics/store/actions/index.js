import axios from "axios";

import { GET_POPS_SUCCESS, GET_POPS_FAIL } from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";

export const getPopsAction = (id) => async (dispatch) => {
  try {
    const getPopsFormData = new FormData();
    getPopsFormData.append("sAction", "AjaxGetPops");
    getPopsFormData.append("pid", 4822);
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
        })
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
      })
    );
  }
};

/* eslint-disable no-return-assign */
import axios from "axios";

import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_TOP_STATISTICS_SUCCESS, GET_TOP_STATISTICS_FAIL,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { getPoplsData } from "../../../popls/store/actions";

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

export const getStatisticItem = (profiles) => async (dispatch) => {
  let result = {};
  const popls = await getPoplsData();
  if (!Array.isArray(profiles)) {
    result.totalProfiles = "1";
    result.totalPopls = `${popls.data.length}`;
    result.linkTaps = `${[...profiles.business, ...profiles.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)}`;
  } else {
    result.totalProfiles = `${profiles.length}`;
    result.totalPopls = `${popls.data.length}`;
    result.linkTaps = `${profiles.map((pr) => [...pr.business, ...pr.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)).reduce((sum, value) => sum += value, 0)}.00`;
  }
  // profiles.forEach((el) => {
  //   result += (el.social?.length || 0) + (el.business?.length || 0);
  // });
  return dispatch({
    type: GET_TOP_STATISTICS_SUCCESS,
    payload: result,
  });
};

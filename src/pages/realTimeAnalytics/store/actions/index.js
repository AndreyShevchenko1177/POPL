/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import axios from "axios";

import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_TOP_STATISTICS_SUCCESS,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { getPoplsData } from "../../../popls/store/actions";

const getPops = async (id) => {
  try {
    const getPopsFormData = new FormData();
    getPopsFormData.append("sAction", "AjaxGetPops");
    getPopsFormData.append("pid", Number(id));
    getPopsFormData.append("ajax", 1);

    return axios.post("", getPopsFormData, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

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
    console.log(error);
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
  result.totalPopls = `${popls.data.length}`;
  if (!Array.isArray(profiles)) {
    result.totalProfiles = "1";
    result.linkTaps = `${[...profiles.business, ...profiles.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)}`;
    const { data } = await getPops(profiles.id);
    result.popsCount = data.length;
  } else {
    result.totalProfiles = `${profiles.length}`;
    result.linkTaps = `${profiles.map((pr) => [...pr.business, ...pr.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)).reduce((sum, value) => sum += value, 0)}`;
    const data = await Promise.all(profiles.map((el) => getPops(el.id)));
    result.popsCount = data.reduce((a, b) => a + b.data.length, 0);
  }

  return dispatch({
    type: GET_TOP_STATISTICS_SUCCESS,
    payload: result,
  });
};

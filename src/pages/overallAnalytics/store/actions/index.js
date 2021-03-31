/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import axios from "axios";

import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_TOP_STATISTICS_SUCCESS, IS_DATA_FETCHING, CLEAN, INDIVIDUAL_POPS_COUNT,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { getPoplsDataById } from "../../../popls/store/actions/requests";
import { profileIds, getProfileAction } from "../../../profiles/store/actions/requests";
import { getId } from "../../../../utils";

const popsActionRequest = (id) => {
  const getPopsFormData = new FormData();
  getPopsFormData.append("sAction", "AjaxGetPops");
  getPopsFormData.append("pid", Number(id));
  getPopsFormData.append("ajax", 1);

  return axios.post("", getPopsFormData, {
    withCredentials: true,
  });
};

export const getPopsAction = (userId, poplName) => async (dispatch, getState) => {
  try {
    console.log(poplName);
    const { id } = getState().authReducer.signIn.data;
    let result;
    if (!userId) {
      const { data } = await profileIds(id);
      const ids = JSON.parse(data);
      const response = await Promise.all([...ids, id].map((id) => popsActionRequest(id)));
      result = response.map(({ data }) => data).reduce((sum, cur) => ([...sum, ...cur]), []);
      if (poplName) {
        const matchString = (popValue) => {
          const result = popValue.slice(-14);
          return result && result.length === 14 ? result : null;
        };

        result = result.filter((pop) => matchString(pop[1]) === poplName);
        dispatch(individualPopsCountAction(result.length));
      }
    } else {
      const response = await popsActionRequest(userId);
      result = response.data;
    }

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
      payload: result,
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

export const getStatisticItemsRequest = (userId) => async (dispatch) => {
  dispatch(isFetchingAction(true));
  const myProfile = await getProfileAction(userId);
  const response = await profileIds(userId);
  if (response.data) {
    const idsArray = JSON.parse(response.data);
    const result = await Promise.all(idsArray.map((id) => getProfileAction(id)));
    const profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
      ...p,
      customId: getId(12),
      business: p.business,
      social: p.social,
    }));
    return dispatch(getStatisticItem(profiles));
  }
  let correctProfile = { customId: getId(12), id: myProfile.id };
  Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
  return dispatch(getStatisticItem(correctProfile));
};

export const getStatisticItem = (profiles) => async (dispatch) => {
  dispatch(isFetchingAction(true));
  let result = {};
  if (!Array.isArray(profiles)) {
    result.totalProfiles = "1";
    result.linkTaps = `${[...profiles.business, ...profiles.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)}`;
    const { data } = await popsActionRequest(profiles.id);
    result.popsCount = data.length;
    const popls = await getPoplsDataById(profiles.id);
    result.totalPopls = `${popls.data.length}`;
  } else {
    result.totalProfiles = `${profiles.length}`;
    result.linkTaps = `${profiles.map((pr) => [...pr.business, ...pr.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)).reduce((sum, value) => sum += value, 0)}`;
    const data = await Promise.all(profiles.map((el) => popsActionRequest(el.id)));
    const popls = await Promise.all(profiles.map((el) => getPoplsDataById(el.id)));
    result.totalPopls = popls.reduce((sum, value) => sum += value.data.length, 0);
    result.popsCount = data.reduce((a, b) => a + b.data.length, 0);
  }

  return dispatch({
    type: GET_TOP_STATISTICS_SUCCESS,
    payload: result,
  });
};

export const individualPopsCountAction = (number) => ({
  type: INDIVIDUAL_POPS_COUNT,
  payload: number,
});

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const cleanAction = () => ({
  type: CLEAN,
});

/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  GET_POPS_SUCCESS,
  GET_POPS_SUCCESS_NEW,
  GET_POPS_FAIL,
  IS_DATA_FETCHING, CLEAN,
  INDIVIDUAL_POPS_COUNT,
  DASHBOARD_POPS_DATA,
  CLEAN_BY_NAME,
  GET_LINK_TAPS_BOTTOM,
  GET_VIEWS_BOTTOM,
  GET_LINKS_TOP,
  GET_VIEWS_TOP,
  TOTAL_POPLS,
  POPS_COUNT_TOP,
} from "../actionTypes";

import { removeCommas, filterPops } from "../../../../utils";
import { snackBarAction } from "../../../../store/actions";
import { profileIdsRequest } from "../../../profiles/store/actions/requests";
import * as requests from "./requests";

export const mainAnalyticsAction = () => async (dispatch, getState) => {
  const profilesData = getState().profilesReducer.dataProfiles.data;

  const userIdsArray = profilesData.map(({ id }) => id);

  // get all views for all profiles
  dispatch(getViewsByDate(userIdsArray));

  // get all links taps for all profiles
  dispatch(getLinkTapsAction(userIdsArray));

  // get all pops for all profiles
  Promise.all(userIdsArray.map((id) => requests.popsActionRequest(id)))
    .then((res) => {
      const poplPops = [];
      const qrCodePops = [];
      const walletPops = [];
      res.map(({ data }) => data).reduce((sum, cur) => ([...sum, ...cur]), []).forEach((pop) => {
        if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
        if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
        if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
      });
      return dispatch({
        type: GET_POPS_SUCCESS_NEW,
        payload: {
          poplPops, qrCodePops, walletPops, allPops: [...poplPops, ...qrCodePops, ...walletPops],
        },
      });
    })
    .catch((err) => console.log(err));
};

export const individualPopsCountAction = (number) => ({
  type: INDIVIDUAL_POPS_COUNT,
  payload: number,
});

export const getLinkTapsAction = (profileId) => async (dispatch) => {
  try {
    const linkTaps = await Promise.all(profileId.map((id) => requests.getLinkTaps(id)));

    dispatch({
      type: GET_LINK_TAPS_BOTTOM,
      payload: linkTaps.reduce((acc, value) => ([...acc, ...value.data]), []),
    });
  } catch (error) {
    console.log(error);
    dispatch(isFetchingAction(false, "linkTapsBottom"));
  }
};

export const getViewsByDate = (profileId) => async (dispatch) => {
  try {
    const views = await Promise.all(profileId.map((id) => requests.getViews(id)));

    dispatch({
      type: GET_VIEWS_BOTTOM,
      payload: views.reduce((acc, value) => ([...acc, ...value.data]), []),
    });
  } catch (error) {
    console.log(error);
    dispatch(isFetchingAction(false, "viewsBottom"));
  }
};

export const isFetchingAction = (isFetching, name) => ({
  type: IS_DATA_FETCHING,
  payload: name ? { isFetching, name } : isFetching,
});

export const cleanAction = () => ({
  type: CLEAN,
});

export const cleanActionName = (name) => ({
  type: CLEAN_BY_NAME,
  payload: name,
});

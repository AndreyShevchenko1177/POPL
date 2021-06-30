/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  GET_POPS_SUCCESS_NEW,
  IS_DATA_FETCHING, CLEAN,
  CLEAN_BY_NAME,
  GET_LINK_TAPS_BOTTOM,
  GET_VIEWS_BOTTOM,
  CHECK_BOX,
  CLEAR_CHECKBOXES,
} from "../actionTypes";

import { filterPops } from "../../../../utils";
import * as requests from "./requests";

export const mainAnalyticsAction = () => async (dispatch, getState) => {
  const profilesData = getState().profilesReducer.dataProfiles.data;
  const storedPops = getState().realTimeAnalytics.allPopsNew;
  const storedLinkTaps = getState().realTimeAnalytics.linkTapsBottom;
  const storedViews = getState().realTimeAnalytics.viewsBottom;

  const userIdsArray = profilesData.map(({ id }) => id);

  // get all views for all profiles if they are not stored in redux
  if (!storedViews.data) {
    dispatch(getViewsByDate(userIdsArray));
  }

  // get all links taps for all profiles
  !storedLinkTaps.data && dispatch(getLinkTapsAction(userIdsArray));
  // dispatch(isFetchingAction(false, "linkTapsBottom"));

  if (storedPops.data) {
    return;
    // return dispatch({
    //   type: GET_POPS_SUCCESS_NEW,
    //   payload: { ...storedPops.data },
    // });
  }

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

export const getLinkTapsAction = (profileId) => async (dispatch, getState) => {
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

export const getViewsByDate = (profileId) => async (dispatch, getState) => {
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

export const setCheckboxAction = (payload, name) => ({
  type: CHECK_BOX,
  payload,
  name,
});

export const clearChecboxAction = () => ({
  type: CLEAR_CHECKBOXES,
});

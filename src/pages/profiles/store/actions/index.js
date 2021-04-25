/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import axios from "axios";
import { snackBarAction, profileCountTierLevelAction, profilesInfoAction } from "../../../../store/actions";
import { getId } from "../../../../utils";
import {
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
  SET_DIRECT_ON_OFF_SUCCESS,
  SET_DIRECT_ON_OFF_FAIL,
  SET_PROFILE_STATUS_SUCCESS,
  SET_PROFILE_STATUS_FAIL,
  TURN_PROFILE_ON_OFF_SUCCESS,
  DELETE_PROFILE_LINK,
  CLEAR_STATE,
  IS_DATA_FETCHING,
} from "../actionTypes";
import * as requests from "./requests";
import { setUserProRequest } from "../../../stripeResultPages/store/requests";

export const getProfilesDataAction = (userId) => async (dispatch, getState) => {
  try {
    const storeProfiles = getState().profilesReducer.dataProfiles.data;
    let profiles = [];
    if (!storeProfiles) {
      dispatch(isFetchingAction(true));
      const myProfile = await requests.getProfileAction(userId);
      const response = await requests.profileIdsRequest(userId);
      profiles = [{ customId: getId(12), id: myProfile.id, ...myProfile.data }];

      if (response.data) {
        const idsArray = JSON.parse(response.data);
        const result = await Promise.all(idsArray.map((id) => requests.getProfileAction(id)));
        profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
          ...p,
          customId: getId(12),
          business: p.business,
          social: p.social,
        }));

        profiles.forEach((profile) => {
          if (profile.pro == "0") requests.makeProfileProRequest(profile.id);
        });
        dispatch(profilesInfoAction(profiles));
        dispatch(profileCountTierLevelAction(profiles.length));
        return dispatch({
          type: GET_DATA_PROFILES_SUCCESS,
          payload: profiles,
        });
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
    dispatch({
      type: GET_DATA_PROFILES_FAIL,
      payload: error,
    });
    return dispatch(isFetchingAction(false));
  }
};

export const addLinkAction = (value, title, profileData, iconId, userId) => async (dispatch) => {
  try {
    const result = await Promise.all(profileData.map((item) => requests.addLinkRequest(value, title, item, iconId)));
    dispatch({
      type: ADD_LINK_SUCCESS,
      payload: "success",
    });
    dispatch(clearStateAction("dataProfiles"));
    return dispatch(getProfilesDataAction(userId));
  } catch (error) {
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
    return dispatch({
      type: ADD_LINK_FAIL,
      error,
    });
  }
};

export const setDirectAction = (profileIds, state, isSingle) => async (dispatch) => {
  try {
    if (!isSingle) dispatch(isFetchingAction(true));
    const result = await Promise.allSettled(profileIds.map((el) => requests.directRequest(el, state)));
    dispatch({
      type: SET_DIRECT_ON_OFF_SUCCESS,
      payload: {
        profileIds: result.filter((res) => res.status === "fulfilled").map((res) => res.value.config.data.get("iID")),
        state,
      },
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: SET_DIRECT_ON_OFF_FAIL,
      error,
    });
  }
};

export const turnProfileAction = (profileIds, state) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true));
    const result = await Promise.allSettled(profileIds.map((el) => requests.turnProfileRequest(el, state)));
    dispatch({
      type: TURN_PROFILE_ON_OFF_SUCCESS,
      payload: {
        profileIds: result.filter((res) => res.status === "fulfilled").map((res) => {
          const { id } = JSON.parse(res.value.config.data);
          return id;
        }),
        state,
      },
    });
  } catch (error) {
    return dispatch({
      type: SET_DIRECT_ON_OFF_FAIL,
      error,
    });
  }
};

export const setProfileStatusAction = (profileIds, state, isSingle) => async (dispatch, getState) => {
  try {
    if (!isSingle) dispatch(isFetchingAction(true));
    const result = await Promise.allSettled(profileIds.map((el) => requests.statusRequest(el, state)));
    dispatch({
      type: SET_PROFILE_STATUS_SUCCESS,
      payload: {
        profileIds: result.filter((res) => res.status === "fulfilled").map((res) => res.value.config.data.get("iID")),
        state,
      },
    });
  } catch (error) {
    return dispatch({
      type: SET_PROFILE_STATUS_FAIL,
      error,
    });
  }
};

export const deleteLinkAction = (linkType, linkHash, profileId, linkId, success) => async (dispatch) => {
  try {
    console.log(linkType, linkHash, profileId, linkId);
    const result = await requests.deleteLinkRequest(linkType, linkHash, profileId, linkId);
    console.log(result);
    if (result.data.success) {
      success();
      return dispatch({
        type: DELETE_PROFILE_LINK,
        payload: {
          profileId,
          linkId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

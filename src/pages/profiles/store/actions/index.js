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
  SET_DIRECT_ON_OFF_FAIL,
  SET_PROFILE_STATUS_FAIL,
  DELETE_PROFILE_LINK,
  CLEAR_STATE,
  IS_DATA_FETCHING,
} from "../actionTypes";
import * as requests from "./requests";

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
    return dispatch(getProfilesDataAction(userId));
    // dispatch(
    //   snackBarAction({
    //     message: "Error by adding link",
    //     severity: "error",
    //     duration: 3000,
    //     open: true,
    //   }),
    // );
    // return dispatch({
    //   type: ADD_LINK_FAIL,
    //   error: { text: "fail" },
    // });
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

export const setDirectAction = (profileIds, state, userId) => async (dispatch) => {
  try {
    dispatch(clearStateAction("dataProfiles"));
    if (userId) dispatch(isFetchingAction(true));
    await Promise.all(profileIds.map((el) => requests.directRequest(el, state)));
    if (userId) return dispatch(getProfilesDataAction(userId));
  } catch (error) {
    return dispatch({
      type: SET_DIRECT_ON_OFF_FAIL,
      error,
    });
  }
};

export const turnProfileAction = (profileIds, state, userId) => async (dispatch) => {
  try {
    dispatch(clearStateAction("dataProfiles"));
    if (userId) dispatch(isFetchingAction(true));
    await Promise.all(profileIds.map((el) => requests.turnProfileRequest(el, state)));
    if (userId) return dispatch(getProfilesDataAction(userId));
  } catch (error) {
    return dispatch({
      type: SET_DIRECT_ON_OFF_FAIL,
      error,
    });
  }
};

export const setProfileStatusAction = (profileIds, state, userId) => async (dispatch) => {
  try {
    dispatch(clearStateAction("dataProfiles"));
    if (userId) dispatch(isFetchingAction(true));
    await Promise.all(profileIds.map((el) => requests.statusRequest(el, state)));
    if (userId) return dispatch(getProfilesDataAction(userId));
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
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "AjaxCleanLinkValue");
    bodyFormData.append("iProfileNum", linkType);
    bodyFormData.append("sHash", linkHash);

    const result = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    console.log(result);
    if (result.data.done) {
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

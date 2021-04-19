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
  CLEAR_STATE,
  IS_DATA_FETCHING,
} from "../actionTypes";
import * as requests from "./requests";

export const getProfilesDataAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true));
    const storeProfiles = getState().profilesReducer.dataProfiles.data;
    const myProfile = await requests.getProfileAction(userId);
    const response = await requests.profileIds(userId);
    let profiles = [];
    if (response.data) {
      if (storeProfiles) {
        profiles = storeProfiles.map((p) => ({
          ...p,
          customId: getId(12),
          business: p.business,
          social: p.social,
        }));
      } else {
        const idsArray = JSON.parse(response.data);
        const result = await Promise.all(idsArray.map((id) => requests.getProfileAction(id)));
        profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
          ...p,
          customId: getId(12),
          business: p.business,
          social: p.social,
        }));
      }
      dispatch(profilesInfoAction(profiles));
      dispatch(profileCountTierLevelAction(profiles.length));
      return dispatch({
        type: GET_DATA_PROFILES_SUCCESS,
        payload: profiles,
      });
    }
    dispatch(profileCountTierLevelAction(1));
    let correctProfile = { customId: getId(12), id: myProfile.id };
    dispatch(profilesInfoAction([correctProfile]));
    Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
    dispatch({
      type: GET_DATA_PROFILES_SUCCESS,
      payload: [{
        ...correctProfile,
        business: correctProfile.business,
        social: correctProfile.social,
      },
      ],
    });
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

const directRequest = (id, state) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetDirectDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("bIsDirect", state);
  return axios.post("", bodyFormData);
};

const turnProfileRequest = (id, state) => {
  const profileData = {
    id,
    value: state,
  };
  return axios({
    method: "post",
    url: "",
    baseURL: "/emailAdd",
    data: profileData,
  });
};

export const setDirectAction = (profileIds, state, userId) => async (dispatch) => {
  try {
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

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import axios from "axios";
import { snackBarAction } from "../../../../store/actions";
import { getId } from "../../../../utils";
import {
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
  SET_DIRECT_ON_OFF_SUCCESS,
  SET_DIRECT_ON_OFF_FAIL,
  SET_PROFILE_STATUS_FAIL,
  CLEAR_STATE,
  IS_DATA_FETCHING,
} from "../actionTypes";
import { getStatisticItem } from "../../../realTimeAnalytics/store/actions";

export const profileIds = async (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "getChild");
  bodyFormData.append("iID", userId);
  const response = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return response;
};

export const getProfileAction = (id) => async (dispatch) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetProfileData");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  const { data } = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return { data, id };
};

export const getProfilesIds = (userId) => async (dispatch) => {
  try {
    dispatch(isFetchingAction(true));
    const myProfile = await dispatch(getProfileAction(userId));
    const response = await profileIds(userId);
    if (response.data) {
      const idsArray = JSON.parse(response.data);
      const result = await Promise.all(idsArray.map((id) => dispatch(getProfileAction(id))));
      const profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
        ...p,
        customId: getId(12),
        business: p.business,
        social: p.social,
      }));
      dispatch(getStatisticItem(profiles));
      return dispatch({
        type: GET_DATA_PROFILES_SUCCESS,
        payload: profiles,
      });
    }
    let correctProfile = { customId: getId(12), id: myProfile.id };
    Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
    dispatch(getStatisticItem(correctProfile));
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

export const addLinkAction = (value, userId, iconId) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "UpdateLinksValuesDashboard");
    bodyFormData.append("ajax", "1");
    bodyFormData.append("iID", userId);
    bodyFormData.append("aLinksIDs[]", iconId);
    bodyFormData.append("aTitles[]", "title");
    bodyFormData.append("aValues[]", value);
    bodyFormData.append("aIcons[]", "");
    bodyFormData.append("aProfiles[]", "1");
    const result = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    if (result.data.done === "Success") {
      dispatch({
        type: ADD_LINK_SUCCESS,
        payload: "success",
      });
      return dispatch(getProfilesIds(userId));
    }
    dispatch(
      snackBarAction({
        message: "Error by adding link",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
    return dispatch({
      type: ADD_LINK_FAIL,
      error: { text: "fail" },
    });
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

export const setDirectAction = (profileIds, state, userId) => async (dispatch) => {
  try {
    await Promise.all(profileIds.map((el) => directRequest(el, state)));
    if (userId) return dispatch(getProfilesIds(userId));
  } catch (error) {
    return dispatch({
      type: SET_DIRECT_ON_OFF_FAIL,
      error,
    });
  }
};

const statusRequest = (id, state) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetActiveProfileDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("iProfileNum", state);
  return axios.post("", bodyFormData);
};

export const setProfileStatusAction = (profileIds, state, userId) => async (dispatch) => {
  try {
    await Promise.all(profileIds.map((el) => statusRequest(el, state)));
    if (userId) return dispatch(getProfilesIds(userId));
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

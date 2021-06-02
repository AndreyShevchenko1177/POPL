/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import axios from "axios";
import { snackBarAction } from "../../../../store/actions";
import { getId, removeCommas, restrictEdit } from "../../../../utils";
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
  SET_LOCAL_PROFILES_ORDER,
  CLEAR_STATE,
  SET_PROFILE_NAME,
  SET_PROFILE_BIO,
  IS_DATA_FETCHING,
  SET_PROFILE_PHOTO,
  SET_LINK_ORDER,
  SET_LINKS_OBJECT,
  SET_PROFILE_EMAIL,
} from "../actionTypes";
import * as requests from "./requests";
import { subscriptionConfig } from "../../../billing/index";
import { uploadImage } from "../../../../config/firebase.query";

export const getProfilesDataAction = (userId) => async (dispatch, getState) => {
  try {
    const storeProfiles = getState().profilesReducer.dataProfiles.data;
    if (storeProfiles) return; // calling this action only when we don't have profiles in store

    const dashboardPlan = getState().authReducer.dashboardPlan.data;
    let profiles = [];
    dispatch(isFetchingAction(true));
    const myProfile = await requests.getProfileAction(userId);
    const response = await requests.profileIdsRequest(userId);
    profiles = [{ customId: getId(12), id: myProfile.id, ...myProfile.data }];
    if (response.data && response.data !== "null") {
      const idsArray = JSON.parse(removeCommas(response.data));
      const result = await Promise.all(idsArray.map((id) => requests.getProfileAction(id)));
      profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
        ...p,
        name: p.name?.replace(/[\\]/g, "") || "",
        url: p.url?.replace(/[\\]/g, "") || "",
        customId: getId(12),
        business: p.business,
        social: p.social,
      }));

      if (dashboardPlan) {
        const unProProfileIds = [];
        profiles.forEach((profile) => {
          if (profile.pro == "0") {
            unProProfileIds.push(profile.id);
          }
        });

        if (unProProfileIds.length) {
          if (subscriptionConfig[dashboardPlan - 1].unitsRange[1] > profiles.length) { // checking if profiles length in tier making all profiles pro
            Promise.all(unProProfileIds.map((id) => requests.makeProfileSubscriberRequest(id)));
          }
          // =====THIS WAS USED TO MAKE PRO AS MUCH PROFILES AS TIER LEVEL ALLOWS===
          // else {
          //   // we not in tier level - we need calculate how much profiles we could made pro to reach limit
          //   const allowedCount = unProProfileIds.length - (profiles.length - subscriptionConfig[dashboardPlan - 1].unitsRange[1]);
          //   Promise.all(unProProfileIds.slice(0, allowedCount).map((id) => makeProfileSubscriberRequest(id)));
          // }
        }
      }
    }

    return dispatch({
      type: GET_DATA_PROFILES_SUCCESS,
      payload: profiles,
    });
  } catch (error) {
    console.log(error);
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 6000,
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

export const setLocalProfilesOrder = (profiles) => ({
  type: SET_LOCAL_PROFILES_ORDER,
  payload: profiles,
});

export const addLinkAction = (value, title, profileData, iconId, userId, icon) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    const storedProfiles = getState().profilesReducer.dataProfiles.data;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    let uploadedFile;
    if (icon && typeof icon !== "string") {
      uploadedFile = getId(12);
      await uploadImage(new File([icon], `icon-${uploadedFile}`, { type: icon.type }));
    }

    const result = await Promise.allSettled(profileData.map((item) => requests.addLinkRequest(value, title, item, iconId, uploadedFile ? `icon-${uploadedFile}` : "")));
    dispatch({
      type: ADD_LINK_SUCCESS,
      payload: "success",
    });
    const successLinks = result.filter((el) => el.status === "fulfilled" && el.value.data?.done === "Success");

    dispatch(clearStateAction("dataProfiles"));
    return dispatch(getProfilesDataAction(userId));
  } catch (error) {
    console.log(error);
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 6000,
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
    if (isSingle) dispatch(isFetchingAction(true, "setProfilesSettings"));
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
    const userId = getState().authReducer.signIn.data.id;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    dispatch(isFetchingAction(true, "setProfilesSettings"));
    const result = await Promise.allSettled(profileIds.map((el) => requests.turnProfileRequest(el, state)));
    dispatch({
      type: TURN_PROFILE_ON_OFF_SUCCESS,
      payload: {
        profileIds: result.filter((res) => res.status === "fulfilled").map((res) => {
          const { id } = JSON.parse(removeCommas(res.value.config.data));
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
    if (isSingle) dispatch(isFetchingAction(true, "setProfilesSettings"));
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

export const editLinkAction = (success, linksArray, file) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    // if file - uploading file
    let uploadedFile;
    if (file && typeof icon !== "string") {
      uploadedFile = getId(12);
      await uploadImage(new File([file], `icon-${uploadedFile}`, { type: file.type }));
    }

    const result = await Promise.all(linksArray.map((item) => requests.editLinkRequest(item, uploadedFile ? `icon-${uploadedFile}` : "")));
    if (result.every(({ data }) => typeof data === "object" || !!data.success)) {
      success();
      dispatch(clearStateAction("dataProfiles"));
      return dispatch(getProfilesDataAction(userId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteLinkAction = (success, linksArray) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    const result = await Promise.all(linksArray.map(({
      linkType, linkHash, profileId, linkId,
    }) => requests.deleteLinkRequest(linkType, linkHash, profileId, linkId)));
    if (result.every(({ data }) => !!data.success)) {
      success();
      // if (result.length < 2) {
      //   return dispatch({
      //     type: DELETE_PROFILE_LINK,
      //     payload: {
      //       profileId: linksArray[0].profileId,
      //       linkId: linksArray[0].linkId,
      //     },
      //   });
      // }
      dispatch(clearStateAction("dataProfiles"));
      return dispatch(getProfilesDataAction(userId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeProfileOrder = (child, profiles) => async (dispatch, getState) => {
  const userId = getState().authReducer.signIn.data.id;

  if (restrictEdit(userId)) {
    return dispatch(snackBarAction({
      message: "Can not edit demo account",
      severity: "error",
      duration: 12000,
      open: true,
    }));
  }
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "ReorderChild");
    bodyFormData.append("sChild", JSON.stringify(child));
    bodyFormData.append("iID", userId);
    await axios.post("", bodyFormData);
    dispatch(setLocalProfilesOrder(profiles));
  } catch (error) {
    console.log(error);
  }
};

export const setProfileNameAcion = (profileId, profileState, name) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    dispatch(isFetchingAction(true, "setProfileName"));
    const result = await requests.setProfileName(profileId, profileState, name);
    dispatch({
      type: SET_PROFILE_NAME,
      payload: { profileId, name },
    });
  } catch (error) {
    dispatch(isFetchingAction(false, "setProfileName"));
  }
};

export const setProfileBioAcion = (profileId, profileState, bio) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    dispatch(isFetchingAction(true, "setProfileBio"));
    const result = await requests.setProfileBio(profileId, profileState, bio);
    dispatch({
      type: SET_PROFILE_BIO,
      payload: { profileId, bio, profileState },
    });
  } catch (error) {
    dispatch(isFetchingAction(false, "setProfileBio"));
  }
};

export const setProfileEmailAcion = (profileId, email) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    dispatch(isFetchingAction(true, "setProfileEmail"));
    const result = await requests.setProfileEmail(profileId, email);
    if (result.data?.error === "Email already exist") {
      dispatch(isFetchingAction(false, "setProfileEmail"));
      return dispatch(snackBarAction({
        message: "Email alredy exist",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    dispatch({
      type: SET_PROFILE_EMAIL,
      payload: { profileId, email },
    });
  } catch (error) {
    dispatch(isFetchingAction(false, "setProfileEmail"));
  }
};

export const setProfileImageAction = (profileId, profileState, photo, clearEditedProfileCallback) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    dispatch(isFetchingAction(true, "setProfilePhoto"));
    let uploadedFile;
    let result;
    if (photo && typeof photo !== "string") {
      uploadedFile = getId(12);
      result = await uploadImage(new File([photo], `${profileId}_${uploadedFile}`, { type: photo.type }), "photos");
    }

    // file name that uplaods is differents of file name that downloads after that. I've faced it just when uploading in custom folder
    let fileName;
    if (result) {
      fileName = result
        .split("?")[0]
        .split("photos%2F")[1];
    }

    await requests.setProfilePhoto(profileId, profileState, fileName || photo);
    dispatch({
      type: SET_PROFILE_PHOTO,
      payload: { profileId, profileState, photo: fileName || photo },
    });
    clearEditedProfileCallback(0);
  } catch (error) {
    console.log(error);
    dispatch(isFetchingAction(false, "setProfilePhoto"));
    clearEditedProfileCallback(0);
  }
};

export const setLinkOrderAction = (linksIds, hashes, profileId, links, profileState) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    const result = await requests.changeLinksOrderRequest({
      linksIds, hashes, profileId, profileState,
    });
    return dispatch({
      type: SET_LINK_ORDER,
      payload: { [profileId]: links },
    });
  } catch (error) {
    console.log(error);
  }
};

export const makeLinkFirstOrderACtion = (success, data) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    const result = await Promise.all(data.map((item) => requests.changeLinksOrderRequest(item)));
    console.log(result);
    success();
    dispatch(clearStateAction("dataProfiles"));
    return dispatch(getProfilesDataAction(userId)); // when request will work correctly
  } catch (error) {
    console.log(error);
  }
};

export const setProfilesLinksObject = (data, profileId) => ({
  type: SET_LINKS_OBJECT,
  payload: { data, profileId },
});

export const isFetchingAction = (isFetching, name) => ({
  type: IS_DATA_FETCHING,
  payload: name ? { isFetching, name } : isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

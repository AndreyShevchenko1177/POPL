/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import axios from "axios";
import { snackBarAction } from "../../../../store/actions";
import { getId, restrictEdit } from "../../../../utils";
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
  EDIT_PROFILE_LINK,
  DELETE_PROFILE_LINK,
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
      const idsArray = JSON.parse(response.data);
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
          if (subscriptionConfig[dashboardPlan - 1].unitsRange[1] >= profiles.length) { // checking if profiles length in tier making all profiles pro
            Promise.all(unProProfileIds.map((id) => requests.makeProfileSubscriberRequest(id)))
              .then(() => {
                const result = profiles.map((profile) => {
                  if (unProProfileIds.includes(profile.id)) {
                    return { ...profile, pro: "1" };
                  }
                  return profile;
                });
                console.log("profile", profiles);
                dispatch({
                  type: GET_DATA_PROFILES_SUCCESS,
                  payload: result,
                });
              });
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
    console.log("profile", profiles);
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

const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

function setProfileImage({
  id, activeProfile, image, imageBusiness,
}, fileName) {
  if (activeProfile === "1") {
    if (image) {
      return requests.setProfilePhoto(id, "2", fileName);
    }
    return requests.setProfilePhoto(id, activeProfile, fileName);
  }
  if (imageBusiness) {
    return requests.setProfilePhoto(id, "1", fileName);
  }
  return requests.setProfilePhoto(id, activeProfile, fileName);
}

export const setCompanyImageToProfileImage = async (companyImageUrl, profiles) => {
  console.log(profiles);
  try {
    const { data } = await axios({
      baseURL: "/v0",
      url: `/b/poplco.appspot.com/o/logos%2F${companyImageUrl}?alt=media`,
      method: "GET",
      responseType: "blob",
    });
    const result = await uploadImage(new File([data], `${companyImageUrl}_default_.png`, { type: data.type }), "photos");
    console.log(result);
    const fileName = result
      .split("?")[0]
      .split("photos%2F")[1];
    const uploadedImages = await Promise.all(profiles.map((profile) => setProfileImage(profile, fileName)));
    return uploadedImages;
  } catch (err) {
    console.error(err);
  }
};

export const addLinkAction = (value, title, profileData, iconId, icon, file) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true, "addLink"));
    const userId = getState().authReducer.signIn.data.id;

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    let resultUploadIcon; // in this variable will returning firebase custom icon name
    let resultUploadFile; // in this variable will returning firebase uploaded file name

    if (icon && typeof icon !== "string") {
      resultUploadIcon = await uploadImage(new File([icon], `${icon.name.split(".")[icon.name.split(".").length - 1]}_icon-${getId(12)}`, { type: icon.type }));
    }

    if (file) {
      resultUploadFile = await uploadImage(new File([file], `${userId}-file-${getId(12)}^${file.name}`, { type: file.type }));
    }

    let iconName;
    let fileName;

    if (resultUploadIcon) { // if filename returned from firebase taking form there name without other url params
      let url = resultUploadIcon.split("?")[0];
      iconName = url.split("/")[url.split("/").length - 1];
    }

    if (resultUploadFile) { // if filename returned from firebase taking from there name without other url params
      let url = resultUploadFile.split("?")[0];
      fileName = url.split("/")[url.split("/").length - 1];
    }

    const result = await Promise.allSettled(profileData.map((item) => requests.addLinkRequest(iconId === 37 ? fileName : value, title, item, iconId, iconName || "")));

    console.log(result);

    const successLinksIds = result
      .filter((el) => el.status === "fulfilled" && el.value.data?.done === "Success") // filtering by success request
      .map((link) => link.value.config?.data.get("iID")); // getting ids from request config in formdata

    const newProfileData = await Promise.all(successLinksIds.map((id) => requests.getProfileAction(id))); // getting updated profiles

    dispatch({
      type: ADD_LINK_SUCCESS,
      payload: {
        profiles: newProfileData.map(({ data, id }) => ({ ...data, id })),
        data: "success",
      },
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
    return dispatch({
      type: ADD_LINK_FAIL,
      error,
    });
  }
};

export const setDirectAction = (profileIds, state, isSingle) => async (dispatch, getState) => {
  try {
    if (isSingle) dispatch(isFetchingAction(true, "setProfilesSettings"));
    dispatch({
      type: SET_DIRECT_ON_OFF_SUCCESS,
      payload: {
        profileIds,
        state,
      },
    });
    const result = await Promise.allSettled(profileIds.map((el) => requests.directRequest(el, state)));
    const errors = result.filter(({ value }) => !value.data.done);
    if (errors.length) {
      const profiles = getState().profilesReducer.dataProfiles.data;
      const profilesWithError = profiles.filter((profile) => errors.map((res) => String(res.value.config.data.get("iID"))).includes(String(profile.id))).map(({ name, nameBusiness }) => name || nameBusiness);
      return dispatch(snackBarAction({
        message: `An error occurred while updating the direct on/direct off switcher for such accounts - ${profilesWithError.join(", ")}`,
        severity: "error",
        open: true,
        duration: 10000,
      }));
    }
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
          const { id } = JSON.parse((res.value.config.data));
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
    if (isSingle) {
      dispatch(isFetchingAction(true, "setProfilesSettings"));
    }
    dispatch({
      type: SET_PROFILE_STATUS_SUCCESS,
      payload: {
        profileIds,
        state,
      },
    });
    const result = await Promise.allSettled(profileIds.map((el) => requests.statusRequest(el, state)));
    const errors = result.filter(({ value }) => !value.data.done);
    if (errors.length) {
      const profiles = getState().profilesReducer.dataProfiles.data;
      const profilesWithError = profiles.filter((profile) => errors.map((res) => String(res.value.config.data.get("iID"))).includes(String(profile.id))).map(({ name, nameBusiness }) => name || nameBusiness);
      return dispatch(snackBarAction({
        message: `An error occurred while updating the personal/business switcher for such accounts - ${profilesWithError.join(", ")}`,
        severity: "error",
        open: true,
        duration: 10000,
      }));
    }
  } catch (error) {
    return dispatch({
      type: SET_PROFILE_STATUS_FAIL,
      error,
    });
  }
};

export const editLinkAction = (success, linksArray, file, linkFile) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    dispatch(isFetchingAction(true, "editLink"));

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }
    let uploadedIcon; // in this variable will returning firebase icon name
    let uploadedFile;

    // for uploaded file in link type file
    if (linkFile) {
      uploadedFile = await uploadImage(new File([linkFile], `${userId}-file-${getId(12)}^${linkFile.name}`, { type: linkFile.type }));
    }

    // if icon - uploading file
    if (file && typeof icon !== "string") {
      uploadedIcon = await uploadImage(new File([file], `${file.name.split(".")[file.name.split(".").length - 1]}_icon-${getId(12)}`, { type: file.type }));
    }

    let fileName;
    let linkFileName;
    if (uploadedIcon) { // if filename returned from firebase taking form there name without other url params
      let url = uploadedIcon.split("?")[0];
      fileName = url.split("/")[url.split("/").length - 1];
    }

    if (uploadedFile) { // if linkFileName returned from firebase taking form there name without other url params
      let url = uploadedFile.split("?")[0];
      linkFileName = url.split("/")[url.split("/").length - 1];
    }

    const result = await Promise.allSettled(linksArray.map((item) => requests.editLinkRequest({ ...item, linkValue: linkFileName || item.linkValue }, fileName || "")));

    const successLinksIds = result
      .filter((el) => el.status === "fulfilled" && (typeof el.value.data === "object" || !!el.value.data?.success)) // filtering by success request
      .map((link) => link.value.config?.data.get("iID")); // getting ids from request config in formdata

    const newProfileData = await Promise.all(successLinksIds.map((id) => requests.getProfileAction(id))); // getting updated profiles

    if (successLinksIds.length) success();

    dispatch({
      type: EDIT_PROFILE_LINK,
      payload: newProfileData.map(({ data, id }) => ({ ...data, id })),
    });
  } catch (error) {
    console.log(error);
    dispatch(isFetchingAction(false, "editLink"));
  }
};

export const deleteLinkAction = (success, linksArray) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    dispatch(isFetchingAction(true, "deleteLink"));

    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    const result = await Promise.allSettled(linksArray.map(({
      linkType, linkHash, profileId, linkId,
    }) => requests.deleteLinkRequest(linkType, linkHash, profileId, linkId)));

    const successLinksIds = result
      .filter((el) => el.status === "fulfilled" && !!el.value.data?.success) // filtering by success request
      .map((link) => link.value.config?.data.get("iID")); // getting ids from request config in formdata

    const newProfileData = await Promise.all(successLinksIds.map((id) => requests.getProfileAction(id))); // getting updated profiles

    if (successLinksIds.length) success();

    dispatch({
      type: DELETE_PROFILE_LINK,
      payload: newProfileData.map(({ data, id }) => ({ ...data, id })),
    });
  } catch (error) {
    dispatch(isFetchingAction(false, "deleteLink"));

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
    await requests.setProfileOrderRequest(userId, child);
    dispatch({
      type: SET_LOCAL_PROFILES_ORDER,
      payload: profiles,
    });
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
    await requests.setProfileName(profileId, profileState, name);
    const updatedProfile = await requests.getProfileAction(profileId); // making it just for name cause we need to know actual info about name. we setting it to url if name is absent and now we need to check it again
    dispatch({
      type: SET_PROFILE_NAME,
      payload: {
        profileId, name, profileState, updatedProfile: updatedProfile.data,
      },
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

export const setProfileEmailAcion = (profileId, email, setPrevEmail) => async (dispatch, getState) => {
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
      dispatch(snackBarAction({
        message: "Email alredy exist",
        severity: "error",
        duration: 12000,
        open: true,
      }));
      return setPrevEmail();
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
      result = await uploadImage(new File([photo], `${photo.name.split(".")[photo.name.split(".").length - 1]}_${profileId}_${uploadedFile}.png`, { type: photo.type }), "photos");
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

export const usageRecordAction = async (subItemId, quantity, timestamp) => {
  try {
    const result = await requests.usageRecordRequest(subItemId, quantity, timestamp);
    console.log(result);
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

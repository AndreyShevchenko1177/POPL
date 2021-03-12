/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import axios from "axios";
import { snackBarAction } from "../../../../store/actions";
import { getId } from "../../../../utils";
import {
  ADD_PROFILES_SUCCESS,
  ADD_PROFILES_FAIL,
  EDIT_PROFILES_SUCCESS,
  EDIT_PROFILES_FAIL,
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
} from "../actionTypes";
import { getStatisticItem } from "../../../realTimeAnalytics/store/actions";
import { getPoplsAction } from "../../../popls/store/actions";

export const addPoplAction = (proplData) => async (dispatch, getState) => {
  try {
    const { id, url } = getState().authReducer.signIn.data;
    const addPoplsFormData = new FormData();
    addPoplsFormData.append("sAction", "AddPopl");
    addPoplsFormData.append("sName", proplData?.name || "Profile4");
    addPoplsFormData.append("sSlug", url && "testing");
    addPoplsFormData.append("iMemberID", id);
    addPoplsFormData.append("ajax", 1);

    await axios.post("", addPoplsFormData, {
      withCredentials: true,
    });
    return dispatch({
      type: ADD_PROFILES_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: ADD_PROFILES_FAIL,
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

export const editPoplAction = (proplData) => async (dispatch, getState) => {
  try {
    const { id, url } = getState().authReducer.signIn.data;
    const updatePoplsFormData = new FormData();
    updatePoplsFormData.append("sAction", "UpdatePopl");
    updatePoplsFormData.append("sName", proplData?.name || "Profile4");
    updatePoplsFormData.append("sSlug", url && "testing");
    updatePoplsFormData.append("iMemberID", id);
    updatePoplsFormData.append("ajax", 1);

    const data = await axios.post("", updatePoplsFormData, {
      withCredentials: true,
    });
    return dispatch({
      type: EDIT_PROFILES_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    dispatch({
      type: EDIT_PROFILES_FAIL,
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

export const getProfileAction = (id) => async (dispatch) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetProfileData");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const getProfilesIds = (userId) => async (dispatch) => {
  try {
    const myProfile = await dispatch(getProfileAction(userId));
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "getChild");
    bodyFormData.append("iID", 4822);
    const response = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    if (response.data) {
      const idsArray = JSON.parse(response.data);
      const result = [];
      for (const id of idsArray) {
        result.push({ data: await dispatch(getProfileAction(id)), id });
      }
      const profiles = [{ ...myProfile.data, id: 4822 }, ...result.map((el) => ({ ...el.data.data, id: el.id }))].map((p) => ({
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
    let correctProfile = { customId: getId(12) };
    Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
    dispatch(getStatisticItem(correctProfile));
    return dispatch({
      type: GET_DATA_PROFILES_SUCCESS,
      payload: [{
        ...correctProfile,
        business: correctProfile.business,
        social: correctProfile.social,
      },
      ],
    });
  } catch (error) {
    return dispatch({
      type: GET_DATA_PROFILES_FAIL,
      payload: error,
    });
  }
};

// const bodyFormData = new FormData();
// bodyFormData.append("sAction", "UpdateLinksValuesDashboard");
// bodyFormData.append("ajax", "1");
// bodyFormData.append("iID", userId);
// bodyFormData.append("aTitles[]", ["testTitle"]);
// bodyFormData.append("aValues[]", ["testValues"]);
// bodyFormData.append("aHashes[]", ["testHash"]);
// bodyFormData.append("aLinksIDs[]", [30]);
// bodyFormData.append("aClicks[]", [345]);
// bodyFormData.append("aIcons[]", ["test_icon"]);
// bodyFormData.append("aVcards[]", [0]);
// bodyFormData.append("aProfiles[]", [2]);
// axios.post("", bodyFormData, {
//   withCredentials: true,
// });

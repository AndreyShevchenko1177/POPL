/* eslint-disable import/no-cycle */
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
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
  CLEAR_STATE,
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
  const { data } = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return { data, id };
};

export const getProfilesIds = (userId) => async (dispatch) => {
  try {
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
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
    return dispatch({
      type: GET_DATA_PROFILES_FAIL,
      payload: error,
    });
  }
};

export const addLinkAction = (value, userId) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "UpdateLinksValuesDashboard");
    bodyFormData.append("ajax", "1");
    bodyFormData.append("iID", userId);
    bodyFormData.append("aValues[]", value);
    bodyFormData.append("aIcons[]", "");
    bodyFormData.append("aProfiles[]", 1);
    const result = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    if (result.data.done === "Success") {
      return dispatch({
        type: ADD_LINK_SUCCESS,
        payload: "success",
      });
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

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

export const addChildProfile = (userId, childId) => async (dispatch) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "addChild");
  bodyFormData.append("iID", 242303);
  bodyFormData.append("sChild", "[236232]");
  const response = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

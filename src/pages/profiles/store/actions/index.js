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
    bodyFormData.append("iID", userId);
    const response = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    if (response.data) {
      const idsArray = JSON.parse(response.data);
      const result = await Promise.all(idsArray.map((id) => dispatch(getProfileAction(id)))).then((res) => res.map((el) => el.data));

      const profiles = [myProfile.data, ...result].map((p) => ({
        ...p,
        customId: getId(12),
        business: p.business?.sort((a, b) => a.id - b.id).filter((_, index) => index < 5),
        social: p.social?.sort((a, b) => a.id - b.id).filter((_, index) => index < 5),
      }));
      return dispatch({
        type: GET_DATA_PROFILES_SUCCESS,
        payload: profiles,
      });
    }
    let correctProfile = { customId: getId(12) };
    Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
    return dispatch({
      type: GET_DATA_PROFILES_SUCCESS,
      payload: [{
        ...correctProfile,
        business: correctProfile.business?.sort((a, b) => a.id - b.id).filter((_, index) => index < 5),
        social: correctProfile.social?.sort((a, b) => a.id - b.id).filter((_, index) => index < 5),
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

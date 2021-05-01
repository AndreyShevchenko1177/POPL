/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import axios from "axios";
import { getId, removeCommas } from "../../../../utils";
import {
  GET_COMPANY_INFO_SUCCESS,
  CLEAR_STATE,
  DELETE_PROFILE,
  IS_DATA_FETCHING,
  GET_COMPANY_INFO_FAIL,
  UPDATE_SIDE_BAR_DATA_STATUS,
} from "../actionTypes";
import * as requests from "./requests";
import { snackBarAction } from "../../../../store/actions";
import { getProfilesDataAction, clearStateAction as clearProfilesState } from "../../../profiles/store/actions";

export const updateUserProfile = ({
  name, color, websiteLink, file,
}) => async (dispatch) => {
  try {
    dispatch(isFetchingAction(true));
    if (name || name === "") await requests.setCompanyName(name);
    if (color || color === "") await requests.setCompanyColor(color);
    if (websiteLink || websiteLink === "") await requests.setCompanyWebSite(websiteLink);
    console.log(file);
    let uploadedFile; // here should be firebase upload function
    if (file && typeof file !== "string") {
      uploadedFile = getId(12);
      await requests.setCompanyAvatar(new File([file], `${uploadedFile}`, { type: file.type }));
    }
    console.log(file);
    if (typeof uploadedFile === "string") {
      await requests.setCompanyImage(uploadedFile);
    } else requests.setCompanyImage(file || "");

    dispatch(clearStateAction("companyInfo"));
    dispatch(getCompanyInfoAction());
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyInfoAction = () => async (dispatch, getState) => {
  try {
    const companyInfo = getState().generalSettingsReducer.companyInfo.data;
    let result = companyInfo;
    if (!companyInfo) {
      dispatch(isFetchingAction(true));
      const userId = getState().authReducer.signIn.data.id;
      const { data } = await requests.getCompanyInfo(userId);
      result = data;
      console.log(data);
    }

    dispatch({
      type: GET_COMPANY_INFO_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_COMPANY_INFO_FAIL,
      payload: error,
    });
  }
};

export const deleteProfileAction = (profileId) => async (dispatch, getState) => {
  const userId = getState().authReducer.signIn.data.id;
  let result;
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "RemoveChild");
    bodyFormData.append("sChild", profileId.toString());
    bodyFormData.append("iID", userId.toString());
    result = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    if (Array.isArray(result.data) || !result.data) {
      dispatch(snackBarAction({
        message: "Profile was successfully deleted",
        severity: "success",
        duration: 4000,
        open: true,
      }));
      dispatch({
        type: UPDATE_SIDE_BAR_DATA_STATUS,
      });
      dispatch(clearProfilesState("dataProfiles"));
      return dispatch(getProfilesDataAction(userId));
    }
  } catch (error) {
    console.log(error);
    return dispatch(snackBarAction({
      message: result.data,
      severity: "error",
      duration: 4000,
      open: true,
    }));
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

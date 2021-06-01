/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import { getId } from "../../../../utils";
import {
  GET_COMPANY_INFO_SUCCESS,
  CLEAR_STATE,
  IS_DATA_FETCHING,
  GET_COMPANY_INFO_FAIL,
} from "../actionTypes";
import * as requests from "./requests";
import { snackBarAction, getProfileInfoRequest } from "../../../../store/actions";
import { makeProfileNonPro } from "../../../profiles/store/actions/requests";

export const updateUserProfile = ({
  name, color, websiteLink, file,
}) => async (dispatch) => {
  try {
    dispatch(isFetchingAction(true));
    if (name || name === "") await requests.setCompanyName(name);
    if (color || color === "") await requests.setCompanyColor(color);
    if (websiteLink || websiteLink === "") await requests.setCompanyWebSite(websiteLink);
    let uploadedFile; // here should be firebase upload function
    if (file && typeof file !== "string") {
      uploadedFile = getId(12);
      await requests.setCompanyAvatar(new File([file], `${uploadedFile}`, { type: file.type }));
    }
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
      const userId = getState().authReducer.signIn.data?.id;
      const { data } = await requests.getCompanyInfo(userId);
      result = data;
    }

    dispatch({
      type: GET_COMPANY_INFO_SUCCESS,
      payload: result.map((item, i) => {
        if (i === 0) item = item.replace(/[\\]/g, "");
        return item;
      }),
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
    result = await requests.deleteProfileRequest(profileId, userId);
    if (Array.isArray(result.data) || !result.data) {
      dispatch(snackBarAction({
        message: "Account was successfully deleted",
        severity: "success",
        duration: 4000,
        open: true,
      }));
      // making profile  unpro when deleting from our children
      makeProfileNonPro(profileId);
      return dispatch(getProfileInfoRequest(userId));
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

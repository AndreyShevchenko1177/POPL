/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import { getId } from "../../../../utils";
import {
  GET_COMPANY_INFO_SUCCESS,
  CLEAR_STATE,
  IS_DATA_FETCHING,
  GET_COMPANY_INFO_FAIL,
  IS_FILE_CONVERTING,
} from "../actionTypes";
import * as requests from "./requests";
import { snackBarAction, getProfileInfoRequest } from "../../../../store/actions";
import { makeProfileNonPro } from "../../../profiles/store/actions/requests";
import { uploadImage } from "../../../../config/firebase.query";

export const updateUserProfile = ({
  name, color, websiteLink, file,
}) => async (dispatch) => {
  try {
    dispatch(isFetchingAction(true));
    if (name || name === "") await requests.setCompanyName(name);
    if (color || color === "") await requests.setCompanyColor(color);
    if (websiteLink || websiteLink === "") await requests.setCompanyWebSite(websiteLink);

    let result; // response from firebase upload file
    if (file && typeof file !== "string") {
      result = await uploadImage(new File([file], `${file.name.split(".")[file.name.split(".").length - 1]}_${getId(12)}.png`, { type: file.type }), "logos");
    }
    let fileName;
    if (result) { // if filename returned from firebase taking form there name without other url params
      fileName = result
        .split("?")[0]
        .split("logos%2F")[1];
    }
    if (fileName) {
      await requests.setCompanyImage(fileName);
    } else {
      await requests.setCompanyImage(file || "");
    }

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
        if (i === 1 && !item) item = "#ffffff";
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
        message: "Account was successfully removed",
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

export const isFileConvertingAction = (isFetching) => ({
  type: IS_FILE_CONVERTING,
  payload: isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

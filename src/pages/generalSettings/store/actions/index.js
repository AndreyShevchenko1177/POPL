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
    if (file) {
      console.log(file);
      uploadedFile = getId(12);
      await requests.setCompanyAvatar(new File([file], `${uploadedFile}`, { type: file.type }));
      console.log(uploadedFile);
    }
    if (typeof uploadedFile === "string") {
      await requests.setCompanyImage(uploadedFile);
    } else requests.setCompanyImage("");

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

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

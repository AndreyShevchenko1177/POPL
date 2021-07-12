/* eslint-disable no-continue */
import * as requests from "./requests";
import {
  ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, IS_FETCHING, FILES_LIST, REMOVE_FILE, INVITE_BY_EMAIL_SUCCESS, INVITE_BY_EMAIL_FAIL,
} from "../actionTypes";
import { clearStateAction } from "../../../profiles/store/actions";
import { getProfileInfoRequest, snackBarAction } from "../../../../store/actions";
import { restrictEdit } from "../../../../utils";

export const addNewProfileWithRandomEmailAction = (emailCount, resultCallBack) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    const result = [];
    const errors = [];
    dispatch(fetchData(true));
    for (const count of new Array(emailCount).fill()) {
      result.push(await requests.addNewProfileWithRandomEmailRequest(userId));
    }
    result.filter(({ data }) => !data.success).forEach(({ config }) => errors.push(config.data.get("sEmail")));
    if (errors.length > 0) {
      resultCallBack(true, errors);
      return dispatch(fetchData(false));
    }
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfileInfoRequest(userId));
    dispatch({
      type: ADD_NEW_PROFILE_BY_RANDOM_EMAIL,
      payload: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearAction = (payload) => ({
  type: CLEAR,
  payload,
});

const fetchData = (payload) => ({
  type: IS_FETCHING,
  payload,
});

export const createAccountByEmail = (emails, clear) => async (dispatch, getState) => {
  try {
    const userData = getState().authReducer.signIn.data;
    if (restrictEdit(userData.userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 12000,
        open: true,
      }));
    }

    const reqEmails = emails.filter((email, i, array) => array.indexOf(email) === i);
    for (const email of reqEmails) {
      const { data } = await requests.getIdFromEmail(email);
      if (data == userData.id) continue;
      if (data == "null" || !data) {
        requests.addNewProfileByEmailRequest(email, userData.id);
      } else {
        requests.inviteByEmailRequest(email, userData, data);
      }
    }
    dispatch(snackBarAction({
      message: `${reqEmails.length} ${reqEmails.length > 1 ? "accounts" : "account"} created successfully`,
      severity: "success",
      duration: 6000,
      open: true,
    }));
    clear();
    dispatch(fetchData(false));
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfileInfoRequest(userData.id));

    dispatch({
      type: INVITE_BY_EMAIL_SUCCESS,
      payload: "success",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: INVITE_BY_EMAIL_FAIL,
      payload: error,
    });
    dispatch(fetchData(false));
    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 6000,
        open: true,
      }),
    );
  }
};

export const addFileNewProfileAction = (fileName) => ({
  type: FILES_LIST,
  payload: fileName,
});

export const removeFileAction = (fileName) => ({
  type: REMOVE_FILE,
  payload: fileName,
});

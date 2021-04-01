/* eslint-disable no-continue */
import axios from "axios";
import { snackBarAction } from "../../../../store/actions";
import {
  ADD_CHILD_PROFILE_SUCCESS,
  ADD_CHILD_PROFILE_FAIL,
  SIGN_IN_CHILD_SUCCESS,
  SIGN_IN_CHILD_FAIL,
  IS_DATA_FETCHING,
  INVITE_BY_EMAIL_SUCCESS,
  INVITE_BY_EMAIL_FAIL,
  FILES_LIST,
  ADD_EMAIL,
  REMOVE_FILE,
  CLEAR_STATE,
} from "../actionTypes";

export const addChildProfileAction = (userId, childId) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "addChild");
    bodyFormData.append("iID", userId);
    bodyFormData.append("sChild", `[${childId}]`);
    const response = await axios.post("", bodyFormData, {
      withCredentials: true,
    });

    return dispatch({
      type: ADD_CHILD_PROFILE_SUCCESS,
      payload: "success",
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
      type: ADD_CHILD_PROFILE_FAIL,
      payload: error,
    });
  }
};

export const signInChildAction = (credo) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sEmail", credo.email);
    bodyFormData.append("sPassword", credo.password);
    bodyFormData.append("sAction", "Auth");
    bodyFormData.append("ajax", 1);
    const { data } = await axios.post("", bodyFormData);
    if (!data.success) {
      dispatch(
        snackBarAction({
          message: "Sign in fail",
          severity: "error",
          duration: 3000,
          open: true,
        }),
      );
      return dispatch({
        type: SIGN_IN_CHILD_FAIL,
        payload: true,
      });
    }

    return dispatch({
      type: SIGN_IN_CHILD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_CHILD_FAIL,
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

const inviteByEmailRequest = (email, userData, emailId) => {
  const formdata = new FormData();
  formdata.append("ajax", "1");
  formdata.append("sAction", "AddToDashboardEmail");
  formdata.append("sToEmail", email);
  formdata.append("sToName", "name");
  formdata.append("sCompanyName", userData.name);
  formdata.append("iID", userData.id);
  formdata.append("sChild", `[${emailId}]`);
  formdata.append("sSubject", "Hey name, time to go pro :rocket:");
  return axios.post("", formdata);
};

const getIdFromEmail = async (email) => {
  const formdata = new FormData();
  formdata.append("ajax", "1");
  formdata.append("sAction", "GetIdFromEmail");
  formdata.append("iEmail", email);
  return axios.post("", formdata);
};

export const inviteByEmailAction = (emails, userData, clear) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true));
    clear();
    const reqEmails = emails.filter((email, i, array) => array.indexOf(email) === i);
    for (const email of reqEmails) {
      const { data } = await getIdFromEmail(email);
      if (data == 0) continue;
      inviteByEmailRequest(email, userData, data);
    }
    dispatch(isFetchingAction(false));
    dispatch(removeFileAction());
    // reqEmails.forEach((email) => dispatch(addEmailAction(email.emailString?.trim() || email.trim())));
    // if (files) dispatch(addFileAction(Object.values(files)[0].file.name));
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
    dispatch(isFetchingAction(false));
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

export const addFileAction = (fileName) => ({
  type: FILES_LIST,
  payload: fileName,
});

export const addEmailAction = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const removeFileAction = (fileName) => ({
  type: REMOVE_FILE,
  payload: fileName,
});

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

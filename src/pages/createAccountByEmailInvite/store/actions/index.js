/* eslint-disable no-continue */
import axios from "axios";
import * as requests from "./requests";
import {
  ADD_NEW_PROFILE_BY_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST, IS_FETCHING, INVITE_BY_EMAIL_SUCCESS, INVITE_BY_EMAIL_FAIL,
} from "../actionTypes";
import { clearStateAction } from "../../../profiles/store/actions";
import { getProfileInfoRequest, snackBarAction } from "../../../../store/actions";
import { restrictEdit } from "../../../../utils";

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

export const inviteByEmailAction = (emails, clear) => async (dispatch, getState) => {
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
      const { data } = await getIdFromEmail(email);
      if (data == userData.id) continue;
      if (data == "null" || !data) {
        inviteToPoplEmail({ email, id: userData.id, name: userData.name });
      } else {
        inviteByEmailRequest(email, userData, data);
      }
    }
    clear();
    dispatch(fetchData(false));
    dispatch(removeFileAction());
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

const inviteToPoplEmail = ({ email, name, id }) => {
  try {
    const formdata = new FormData();
    formdata.append("ajax", "1");
    formdata.append("sAction", "InviteToPoplEmail");
    formdata.append("sToEmail", email);
    formdata.append("sCompanyName", name);
    formdata.append("iID", id);

    return axios.post("", formdata);
  } catch (error) {
    console.log(error);
  }
};

export const addNewProfileByEmailAction = (emails, resultCallBack) => async (dispatch, getState) => {
  try {
    const userData = getState().authReducer.signIn.data;
    const errors = [];

    if (restrictEdit(userData.id)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }

    dispatch(fetchData(true));
    const result = await Promise.all(emails.map((email) => requests.addNewProfileByEmailRequest(email.trim(), userData.id)));
    result.filter(({ data }) => typeof data === "string" || !data.success).forEach(({ config }) => errors.push(config.data.get("sEmail")));
    if (errors.length > 0) {
      console.log(errors);
      dispatch(inviteByEmailAction(errors, userData, resultCallBack));
      //   if (errors.length === result.length) {
      //     resultCallBack(true, errors);
      //     return dispatch(fetchData(false));
      //   }
      //   dispatch(clearStateAction("dataProfiles"));
      // dispatch(getProfileInfoRequest(userId));
      //   dispatch({
      //     type: ADD_NEW_PROFILE_BY_EMAIL,
      //   });
      //   resultCallBack(true, errors);
      return;
      //   return dispatch(fetchData(false));
    }
    resultCallBack();
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfileInfoRequest(userData.id));
    return dispatch({
      type: ADD_NEW_PROFILE_BY_EMAIL,
    });
  } catch (error) {
    console.log(error);
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

export const clearAction = (payload) => ({
  type: CLEAR,
  payload,
});

const fetchData = (payload) => ({
  type: IS_FETCHING,
  payload,
});

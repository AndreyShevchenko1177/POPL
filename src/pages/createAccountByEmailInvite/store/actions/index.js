/* eslint-disable no-continue */
import axios from "axios";
import * as requests from "./requests";
import {
  ADD_NEW_PROFILE_BY_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST, IS_FETCHING, INVITE_BY_EMAIL_SUCCESS, INVITE_BY_EMAIL_FAIL,
} from "../actionTypes";
import { clearStateAction } from "../../../profiles/store/actions";
import { getProfileInfoRequest, snackBarAction } from "../../../../store/actions";
import { restrictEdit } from "../../../../utils";

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
      const { data } = await requests.getIdFromEmail(email);
      if (data == userData.id) continue;
      if (data == "null" || !data) {
        requests.inviteToPoplEmail({ email, id: userData.id, name: userData.name });
      } else {
        requests.inviteByEmailRequest(email, userData, data);
      }
    }

    dispatch(snackBarAction({
      message: `${reqEmails.length} ${reqEmails.length > 1 ? "emails" : "email"} sent successfully`,
      severity: "success",
      duration: 6000,
      open: true,
    }));
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

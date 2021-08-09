/* eslint-disable prefer-destructuring */
import { SEND_NOTIFICATION } from "../actionsType";
import * as requests from "./requests";
import { snackBarAction } from "../../../../store/actions";
import { uploadImage } from "../../../../config/firebase.query";
import { getId } from "../../../../utils";

export const sendNotificationAction = ({ users, ...data }, success) => async (dispatch) => {
  try {
    const result = await Promise.all(users.map((id) => requests.sendNotificationRequest(data, id)));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: `Successfully sent notification to ${result.length} ${result.length > 1 ? "accounts" : "account"}`,
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const sendShedulerNotificationAction = ({ users, ...data }, success) => async (dispatch) => {
  try {
    const result = await Promise.all(users.map((id) => requests.sendShedulerNotificationRequest(data, id)));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: `Successfully sent notification to ${result.length} ${result.length > 1 ? "accounts" : "account"}`,
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailAction = ({ users, ...data }, success, isConnection, fileUrl, fileType, fileName) => async (dispatch, getState) => {
  try {
    const user = getState().profilesReducer.dataProfiles.data[0];
    const companyInfo = getState().generalSettingsReducer.companyInfo.data;

    let fromName;

    if (isConnection) {
      fromName = (companyInfo && companyInfo[0]) || "via Popl Enterprise"; // for notification by connections
    } else {
      fromName = user.name.split(" ")[0];
    }

    const result = await Promise.all(users.map((el) => requests.sendEmailRequest({
      email: el.email, toName: el.name, fromName, title: data.title, message: data.message, fileUrl, fileType, fileName, companyInfo,
    })));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: `${users.length}  ${user.length > 1 ? "emails" : "email"} sent successfully`,
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const sendShedulerEmailAction = ({ users, ...data }, success, isConnection, fileUrl, fileType, fileName) => async (dispatch, getState) => {
  try {
    const user = getState().profilesReducer.dataProfiles.data[0];
    const companyInfo = getState().generalSettingsReducer.companyInfo.data;

    let fromName;

    if (isConnection) {
      fromName = (companyInfo && companyInfo[0]) || "via Popl Enterprise"; // for notification by connections
    } else {
      fromName = user.name.split(" ")[0];
    }
    const result = await Promise.all(users.map((el) => requests.sendShedulerEmailRequest({
      email: el.email, toName: el.name, fromName, title: data.title, message: data.message, time: data.time, fileUrl, fileType, fileName,
    })));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: `${users.length}  ${user.length > 1 ? "emails" : "email"} sent successfully`,
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const addAttachementAction = (file, { users, ...data }, success, isConnection) => async (dispatch, getState) => {
  const userId = getState().authReducer.signIn.data.id;
  const type = file.name.split(".")[file.name.split(".").length - 1];
  let name = file.name.split(".");
  name.pop();
  name = name.join();
  const fileUrl = await uploadImage(new File([file], `${userId}-file-${getId(12)}.${file.name.split(".")[file.name.split(".").length - 1]}`, { type: file.type }), "photos");
  dispatch(sendEmailAction({ users, ...data }, success, isConnection, fileUrl, type, name));
};

export const addAttachementShedulerAction = (file, { users, ...data }, success, isConnection) => async (dispatch, getState) => {
  const userId = getState().authReducer.signIn.data.id;
  const type = file.name.split(".")[file.name.split(".").length - 1];
  let name = file.name.split(".");
  name.pop();
  name = name.join();
  const fileUrl = await uploadImage(new File([file], `${userId}-file-${getId(12)}.${file.name.split(".")[file.name.split(".").length - 1]}`, { type: file.type }), "photos");
  dispatch(sendShedulerEmailAction({ users, ...data }, success, fileUrl, type, name));
};

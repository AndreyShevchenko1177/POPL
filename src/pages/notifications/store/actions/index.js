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
      message: "Successfully sent notification",
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
      message: "Successfully sent notification",
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailAction = ({ users, ...data }, success, fileUrl, fileType) => async (dispatch, getState) => {
  try {
    const user = getState().profilesReducer.dataProfiles.data[0];
    const result = await Promise.all(users.map((el) => requests.sendEmailRequest({
      email: el.email, toName: el.name, fromName: user.name.split(" ")[0], title: data.title, message: data.message, fileUrl, fileType,
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

export const sendShedulerEmailAction = ({ users, ...data }, success, fileUrl, fileType) => async (dispatch, getState) => {
  try {
    const user = getState().profilesReducer.dataProfiles.data[0];
    const result = await Promise.all(users.map((el) => requests.sendShedulerEmailRequest({
      email: el.email, toName: el.name, fromName: user.name.split(" ")[0], title: data.title, message: data.message, time: data.time, fileUrl, fileType,
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

export const addAttachementAction = (file, { users, ...data }, success) => async (dispatch, getState) => {
  const userId = getState().authReducer.signIn.data.id;
  const fileUrl = await uploadImage(new File([file], `${userId}-file-${getId(12)}.${file.name.split(".")[file.name.split(".").length - 1]}`, { type: file.type }), "photos");
  dispatch(sendEmailAction({ users, ...data }, success, fileUrl, file.type));
};

export const addAttachementShedulerAction = (file, { users, ...data }, success) => async (dispatch, getState) => {
  const userId = getState().authReducer.signIn.data.id;
  const fileUrl = await uploadImage(new File([file], `${userId}-file-${getId(12)}.${file.name.split(".")[file.name.split(".").length - 1]}`, { type: file.type }), "photos");
  dispatch(sendShedulerEmailAction({ users, ...data }, success, fileUrl, file.type));
};

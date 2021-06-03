import { SEND_NOTIFICATION } from "../actionsType";
import * as requests from "./requests";
import { snackBarAction } from "../../../../store/actions";

export const sendNotificationAction = ({ users, ...data }, success) => async (dispatch) => {
  try {
    const result = await Promise.all(users.map((id) => requests.sendNotificationRequest(data, id)));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: "Successfully send notification",
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
      message: "Successfully send notification",
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailAction = ({ users, ...data }, success) => async (dispatch, getState) => {
  try {
    const user = getState().profilesReducer.dataProfiles.data[0];
    const result = await Promise.all(users.map((el) => requests.sendEmailRequest({
      email: el.email, toName: el.name, fromName: user.name.split(" ")[0], title: data.title, message: data.message,
    })));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: "Successfully send email",
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const sendShedulerEmailAction = ({ users, ...data }, success) => async (dispatch, getState) => {
  try {
    const user = getState().profilesReducer.dataProfiles.data[0];
    const result = await Promise.all(users.map((el) => requests.sendShedulerEmailRequest({
      email: el.email, toName: el.name, fromName: user.name.split(" ")[0], title: data.title, message: data.message, time: data.time,
    })));
    console.log(result);
    success();
    dispatch(snackBarAction({
      message: "Successfully send email",
      severity: "success",
      duration: 12000,
      open: true,
    }));
  } catch (error) {
    console.log(error);
  }
};

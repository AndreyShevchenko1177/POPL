import { SEND_NOTIFICATION } from "../actionsType";
import * as requests from "./requests";
import { snackBarAction } from "../../../../store/actions";

export const sendNotificationAction = ({ users, ...data }) => async (dispatch) => {
  try {
    const result = await Promise.all(users.map((id) => requests.sendNotificationRequest(data, id)));
    console.log(result);
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

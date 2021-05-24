import axios from "axios";
import { SEND_CODE, SET_NEW_PASSWORD, CLEAR } from "../actionTypes";
import { snackBarAction } from "../../../../store/actions";

export const sendCodeAction = (email) => async (dispatch) => {
  const bodyFormData = new FormData();
  bodyFormData.append("ajax", "1");
  bodyFormData.append("sAction", "SendResetPasswordCode");
  bodyFormData.append("sEmail", email);
  try {
    const result = await axios.post("", bodyFormData);
    if (result?.data?.success) {
      return dispatch({
        type: SEND_CODE,
        payload: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setNewPasswordAction = (password, rePassword, code) => async (dispatch) => {
  const bodyFormData = new FormData();
  bodyFormData.append("ajax", "1");
  bodyFormData.append("sAction", "UpdatePassword");
  bodyFormData.append("sPassword", password);
  bodyFormData.append("sRePassword", rePassword);
  bodyFormData.append("sCode", code);
  try {
    const result = await axios.post("", bodyFormData);
    dispatch({
      type: SET_NEW_PASSWORD,
      payload: "success",
    });
    return dispatch(
      snackBarAction({
        message: "Successfully changed password",
        severity: "success",
        duration: 6000,
        open: true,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const clearAction = () => ({
  type: CLEAR,
});

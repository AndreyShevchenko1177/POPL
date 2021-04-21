import axios from "axios";
import { ADD_NEW_PROFILE_BY_EMAIL, ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR } from "../actionsType";

const addNewProfileByEmailRequest = (email) => {
  console.log(email);
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxCreateAccountWithEmailOnly");
  bodyFormData.append("sEmail", email);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const addNewProfileByEmailAction = (emails, successCallBack) => async (dispatch) => {
  const result = await Promise.all(emails.map((email) => addNewProfileByEmailRequest(email)));
  console.log(result);
  successCallBack();
  return dispatch({
    type: ADD_NEW_PROFILE_BY_EMAIL,
  });
};

export const addNewProfileWithRandomEmail = (emailCount) => async (dispatch) => {
  const bodyFormData = new FormData();
  console.log(emailCount);
  bodyFormData.append("sAction", "AjaxCreateAccountWithRandomEmail");

  const result = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  console.log(result);
};

export const clearAction = (payload) => ({
  type: CLEAR,
  payload,
});

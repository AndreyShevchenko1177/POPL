import axios from "axios";
import {
  ADD_NEW_PROFILE_BY_EMAIL, ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST,
} from "../actionsType";

const addNewProfileByEmailRequest = (email) => {
  console.log(email);
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxCreateAccountWithEmailOnly");
  bodyFormData.append("sEmail", email);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

const addNewProfileWithRandomEmailRequest = async () => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxCreateAccountWithRandomEmail");
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const addNewProfileByEmailAction = (emails, successCallBack) => async (dispatch) => {
  try {
    const result = await Promise.all(emails.map((email) => addNewProfileByEmailRequest(email)));
    console.log(result);
    successCallBack();
    return dispatch({
      type: ADD_NEW_PROFILE_BY_EMAIL,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewProfileWithRandomEmailAction = (emailCount) => async (dispatch) => {
  try {
    const result = [];
    for (const count of new Array(emailCount).fill()) {
      result.push(await addNewProfileWithRandomEmailRequest());
    }
    dispatch({
      type: ADD_NEW_PROFILE_BY_RANDOM_EMAIL,
      payload: true,
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

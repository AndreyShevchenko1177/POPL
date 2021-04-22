import * as requests from "./requests";
import {
  ADD_NEW_PROFILE_BY_EMAIL, ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST,
} from "../actionsType";
import { clearStateAction, getProfilesDataAction } from "../../../profiles/store/actions";

export const addNewProfileByEmailAction = (emails, successCallBack) => async (dispatch, getState) => {
  try {
    const result = await Promise.all(emails.map((email) => requests.addNewProfileByEmailRequest(email)));
    const userId = getState().authReducer.signIn.data.id;
    console.log(result);
    successCallBack();
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfilesDataAction(userId));
    return dispatch({
      type: ADD_NEW_PROFILE_BY_EMAIL,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewProfileWithRandomEmailAction = (emailCount) => async (dispatch, getState) => {
  try {
    const result = [];
    const userId = getState().authReducer.signIn.data.id;
    for (const count of new Array(emailCount).fill()) {
      result.push(await requests.addNewProfileWithRandomEmailRequest());
    }
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfilesDataAction(userId));
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

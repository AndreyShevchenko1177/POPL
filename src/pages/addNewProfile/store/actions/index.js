import * as requests from "./requests";
import {
  ADD_NEW_PROFILE_BY_EMAIL, ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST, IS_FETCHING, UPDATE_SIDE_BAR_DATA_STATUS,
} from "../actionsType";
import { clearStateAction, getProfilesDataAction } from "../../../profiles/store/actions";

export const addNewProfileByEmailAction = (emails, resultCallBack) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    const errors = [];
    dispatch(fetchData(true));
    const result = await Promise.all(emails.map((email) => requests.addNewProfileByEmailRequest(email, userId)));
    result.filter(({ data }) => typeof data === "string" || !data.success).forEach(({ config }) => errors.push(config.data.get("sEmail")));
    if (errors.length > 0) {
      if (errors.length === result.length) {
        resultCallBack(true, errors);
        return dispatch(fetchData(false));
      }
      dispatch(clearStateAction("dataProfiles"));
      dispatch(getProfilesDataAction(userId));
      dispatch({
        type: UPDATE_SIDE_BAR_DATA_STATUS,
      });
      dispatch({
        type: ADD_NEW_PROFILE_BY_EMAIL,
      });
      resultCallBack(true, errors);
      return dispatch(fetchData(false));
    }
    resultCallBack();
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfilesDataAction(userId));
    dispatch({
      type: UPDATE_SIDE_BAR_DATA_STATUS,
    });
    return dispatch({
      type: ADD_NEW_PROFILE_BY_EMAIL,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewProfileWithRandomEmailAction = (emailCount, resultCallBack) => async (dispatch, getState) => {
  try {
    const result = [];
    const errors = [];
    const userId = getState().authReducer.signIn.data.id;
    dispatch(fetchData(true));
    for (const count of new Array(emailCount).fill()) {
      result.push(await requests.addNewProfileWithRandomEmailRequest(userId));
    }
    result.filter(({ data }) => !data.success).forEach(({ config }) => errors.push(config.data.get("sEmail")));
    if (errors.length > 0) {
      resultCallBack(true, errors);
      return dispatch(fetchData(false));
    }
    dispatch(clearStateAction("dataProfiles"));
    dispatch(getProfilesDataAction(userId));
    dispatch({
      type: UPDATE_SIDE_BAR_DATA_STATUS,
    });
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

const fetchData = (payload) => ({
  type: IS_FETCHING,
  payload,
});

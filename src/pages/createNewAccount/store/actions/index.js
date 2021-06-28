import * as requests from "./requests";
import {
  ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, IS_FETCHING,
} from "../actionTypes";
import { clearStateAction } from "../../../profiles/store/actions";
import { getProfileInfoRequest, snackBarAction } from "../../../../store/actions";
import { restrictEdit } from "../../../../utils";

export const addNewProfileWithRandomEmailAction = (emailCount, resultCallBack) => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.signIn.data.id;
    if (restrictEdit(userId)) {
      return dispatch(snackBarAction({
        message: "Can not edit demo account",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
    const result = [];
    const errors = [];
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
    dispatch(getProfileInfoRequest(userId));
    dispatch({
      type: ADD_NEW_PROFILE_BY_RANDOM_EMAIL,
      payload: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearAction = (payload) => ({
  type: CLEAR,
  payload,
});

const fetchData = (payload) => ({
  type: IS_FETCHING,
  payload,
});

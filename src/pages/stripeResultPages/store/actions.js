import { SET_USER_PRO_SUCCESS, SET_USER_PRO_FAIL } from "./actionTypes";
import * as requests from "./requests";
import { removeCommas } from "../../../utils";

export const setUserProAction = (userId) => async (dispatch) => {
  try {
    const response = requests.getChildProfiles(userId);
    if (response.data) {
      const idsArray = JSON.parse(removeCommas(response.data));
      const result = await Promise.all([...idsArray, userId].map((id) => requests.setUserProRequest(id))).then((res) => res.map((d) => d.json()));
      return dispatch({
        type: SET_USER_PRO_SUCCESS,
        payload: result,
      });
    }
    const resultJSon = await requests.setUserProRequest(userId);
    const result = await resultJSon.json();
    return dispatch({
      type: SET_USER_PRO_SUCCESS,
      payload: result,
    });
  } catch (error) {
    return dispatch({
      type: SET_USER_PRO_FAIL,
      error,
    });
  }
};

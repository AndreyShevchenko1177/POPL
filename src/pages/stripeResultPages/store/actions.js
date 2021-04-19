import axios from "axios";
import { SET_USER_PRO_SUCCESS, SET_USER_PRO_FAIL } from "./actionTypes";
import * as requests from "./requests";

const setUserProRequest = (profileId) => {
  const body = JSON.stringify({
    duration: "lifetime",
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk_MLaAGzmHomNgUdmNWfvlxoqvdMIXi",
    },
    body,
  };
  return fetch(`https://api.revenuecat.com/v1/subscribers/${profileId}/entitlements/pro/promotional`, options);
};

export const setUserProAction = (userId) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("sAction", "getChild");
    bodyFormData.append("iID", userId);
    const response = await axios.post("", bodyFormData, {
      withCredentials: true,
    });
    // await requests.setDashboardPlan(userId)
    if (response.data) {
      const idsArray = JSON.parse(response.data);
      const result = await Promise.all([...idsArray, userId].map((id) => setUserProRequest(id))).then((res) => res.map((d) => d.json()));
      return dispatch({
        type: SET_USER_PRO_SUCCESS,
        payload: result,
      });
    }
    const resultJSon = await setUserProRequest(userId);
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

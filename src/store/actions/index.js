import { PROFILE_DATA, ALERT } from "../actionTypes";

export const getProfileData = (data) => ({
  type: PROFILE_DATA,
  payload: data,
});

export const snackBarAction = (payload) => ({
  type: ALERT,
  payload,
});

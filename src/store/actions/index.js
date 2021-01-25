import { PROFILE_DATA } from "../actionTypes";

export const getProfileData = (data) => ({
  type: PROFILE_DATA,
  payload: data,
});

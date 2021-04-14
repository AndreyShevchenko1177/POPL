/* eslint-disable no-return-assign */
/* eslint-disable import/no-cycle */
import axios from "axios";
import {
  PROFILE_DATA, ALERT, PROFILE_INFO_FOR_SIDE_BAR, PROFILE_COUNT_TIER_LEVEL, SUBSCRIPTION_INFO,
} from "../actionTypes";
import { getId } from "../../utils/uniqueId";
import { profileIds, getProfileAction } from "../../pages/profiles/store/actions/requests";
import { getPoplsDataById } from "../../pages/popls/store/actions/requests";
import { getCollectionData } from "../../config/firebase.query";
import { uniqueObjectsInArray } from "../../utils";

export const getProfileData = (data) => ({
  type: PROFILE_DATA,
  payload: data,
});

export const snackBarAction = (payload) => ({
  type: ALERT,
  payload,
});

export const getProfileInfoRequest = (userId) => async (dispatch) => {
  const myProfile = await getProfileAction(userId);
  const response = await profileIds(userId);
  if (response.data && response.data !== "null") {
    const idsArray = JSON.parse(response.data);
    const result = await Promise.all(idsArray.map((id) => getProfileAction(id)));
    const profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
      ...p,
      customId: getId(12),
      business: p.business,
      social: p.social,
    }));
    return dispatch(profilesInfo(profiles, userId));
  }
  let correctProfile = { customId: getId(12), id: myProfile.id };
  Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
  return dispatch(profilesInfo([correctProfile], userId));
};

export const profileCountTierLevelAction = (number) => ({
  type: PROFILE_COUNT_TIER_LEVEL,
  payload: number,
});

export const profilesInfo = (profiles) => async (dispatch) => {
  try {
    let result = {};
    result.totalProfiles = `${profiles.length}`;
    const popls = await Promise.all(profiles.map((el) => getPoplsDataById(el.id)));
    result.totalPopls = popls.reduce((sum, value) => sum += value.data.length, 0);
    const connections = await getCollectionData("people", [...profiles.map((el) => el.id)]);
    const profileConnection = {};
    const poplsConnection = {};
    popls.forEach((item) => poplsConnection[item.config.data.get("iID")] = item.data.length);
    connections.forEach(({ data, docId }) => profileConnection[docId] = uniqueObjectsInArray(data.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })), (item) => item.id).length);
    result.connections = uniqueObjectsInArray(connections.reduce((acc, item) => ([...acc, ...item.data]), []), (item) => item.id).length;

    dispatch({
      type: PROFILE_INFO_FOR_SIDE_BAR,
      payload: { result, profileConnection, poplsConnection },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriptionInfoAction = ({ subscriptionName, maxProfiles }) => ({
  type: SUBSCRIPTION_INFO,
  payload: {
    subscriptionName,
    maxProfiles,
  },
});

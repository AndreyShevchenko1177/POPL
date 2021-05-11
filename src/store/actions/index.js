/* eslint-disable no-return-assign */
/* eslint-disable import/no-cycle */
import {
  PROFILE_DATA, ALERT,
  PROFILE_INFO_FOR_SIDE_BAR,
  PROFILE_COUNT_TIER_LEVEL,
  SUBSCRIPTION_INFO,
  FETCHING_ACTION,
  UPDATE_CONNECTIONS,
  SHOW_RESTRICTED_MODE,
  HIDE_RESTRICTED_MODE,
  PROFILE_INFO_FOR_MAIN_PAGE,
  UPDATE_SIDE_BAR_DATA_STATUS,
  HANDLE_MAIN_PAGE_SCROLL,
  PROFILES_INFO_SIDEBAR,
  POPLS_INFO_SIDEBAR,
  CONNECTIONS_INFO_SIDEBAR,
  LATEST_CONNECTIONS,
} from "../actionTypes";
import { profileIdsRequest, getProfileAction } from "../../pages/profiles/store/actions/requests";
import { getPoplsDataById, getPoplsFromProfiles } from "../../pages/popls/store/actions/requests";
import { popsActionRequest } from "../../pages/overallAnalytics/store/actions/requests";
import { getCollectionData } from "../../config/firebase.query";
import {
  uniqueObjectsInArray, formatDateConnections, getId, removeCommas,
} from "../../utils";

// saving popls in popls reducer
import { GET_POPLS_SUCCESS } from "../../pages/popls/store/actionTypes";

// saving profiles in profiles reducer
const GET_DATA_PROFILES_SUCCESS = "[PROFILE] GET DATA PROFILES SUCCESS";

export const getProfileData = (data) => ({
  type: PROFILE_DATA,
  payload: data,
});

export const snackBarAction = (payload) => ({
  type: ALERT,
  payload,
});

// main action for getting profiles. called in app.js
export const getProfileInfoRequest = (userId) => async (dispatch, getState) => {
  try {
    dispatch(fetchingAction(true));
    dispatch({
      type: UPDATE_SIDE_BAR_DATA_STATUS,
    });
    const profilesData = getState().profilesReducer.dataProfiles.data;
    let profiles;
    if (!profilesData) {
      const myProfile = await getProfileAction(userId);
      const response = await profileIdsRequest(userId);
      let idsArray;
      profiles = [{ ...myProfile.data, id: myProfile.id, customId: getId(12) }];
      if (response.data && response.data !== "null") {
        idsArray = JSON.parse(removeCommas(response.data));
        const result = await Promise.all(idsArray.map((id) => getProfileAction(id)));
        profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
          ...p,
          customId: getId(12),
          business: p.business,
          social: p.social,
        }));
      }
    } else {
      profiles = profilesData;
    }
    dispatch({
      type: GET_DATA_PROFILES_SUCCESS,
      payload: profiles,
    });
    dispatch({
      type: PROFILES_INFO_SIDEBAR,
      payload: profiles.length,
    });
    return dispatch(profilesInfoAction(profiles));
  } catch (error) {
    console.log(error);
    dispatch(fetchingAction(false, "profilesSidebar"));
  }
};

export const profileCountTierLevelAction = (number) => ({
  type: PROFILE_COUNT_TIER_LEVEL,
  payload: number,
});

export const profilesInfoAction = (profiles) => async (dispatch) => {
  try {
    let result = {};
    result.totalProfiles = `${profiles.length}`;
    dispatch({
      type: PROFILE_INFO_FOR_MAIN_PAGE,
      payload: profiles.length,
    });
    Promise.all(profiles.map((profile) => getPoplsFromProfiles(profile)))
      .then((res) => {
        const popls = res
          .reduce((result, current) => [...result, ...current], [])
          .map((el) => ({ ...el, customId: Number(getId(12, "1234567890")) }));
        dispatch({
          type: GET_POPLS_SUCCESS,
          payload: popls,
        });
        dispatch({
          type: POPLS_INFO_SIDEBAR,
          payload: popls.length,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchingAction(false, "poplsSidebar"));
      });

    const connections = await getCollectionData("people", [...profiles.map((el) => el.id)]);
    dispatch({
      type: CONNECTIONS_INFO_SIDEBAR,
      payload: uniqueObjectsInArray(connections.reduce((acc, item) => ([...acc, ...item.data]), []), (item) => item.id).length,
    });
  } catch (error) {
    console.log(error);
    dispatch(fetchingAction(false, "connectionsSidebar"));
  }
};

export const getLatestConnectionsAction = () => async (dispatch, getState) => {
  try {
    const profiles = getState().profilesReducer.dataProfiles.data;

    const connections = await getCollectionData("people", [...profiles.map(({ id }) => id)]);
    const result = uniqueObjectsInArray(connections
      .reduce((acc, item) => ([...acc, ...item.data])
        .sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))), []), (item) => item.id)
      .slice(0, 10)
      .map((con) => {
        const parentProfile = profiles.find((profile) => profile.id === con.profileId);
        return { ...con, parentProfileName: parentProfile?.name || "" };
      });

    dispatch({
      type: LATEST_CONNECTIONS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch(fetchingAction(false, "latestConnections"));
  }
};

export const updateConnectionsNumber = (connections, porfileConnections) => (dispatch, getState) => {
  const prevState = getState().systemReducer.profileInfoSideBar;
  const profilesCon = {};
  Object.keys(porfileConnections).forEach((key) => profilesCon[key] = porfileConnections[key].length);
  dispatch({
    type: UPDATE_CONNECTIONS,
    payload: {
      ...prevState,
      result: {
        ...prevState.result,
        connections: connections.length,
        latestConnections: connections.sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))).slice(0, 10),
      },
      profileConnection: profilesCon,
    },
  });
};

export const getSubscriptionInfoAction = ({ subscriptionName, maxProfiles }) => ({
  type: SUBSCRIPTION_INFO,
  payload: {
    subscriptionName,
    maxProfiles,
  },
});

export const restricteModeAction = (isRestricted) => ({
  type: SHOW_RESTRICTED_MODE,
  payload: isRestricted,
});

export const fetchingAction = (isFetching, name) => ({
  type: FETCHING_ACTION,
  payload: name ? { isFetching, name } : isFetching,
});

export const hideRestrictedModeAction = () => ({
  type: HIDE_RESTRICTED_MODE,
});

export const handleMainPageScrollAction = (isScroll) => (dispatch) => dispatch({
  type: HANDLE_MAIN_PAGE_SCROLL,
  payload: isScroll,
});

/* eslint-disable no-return-assign */
/* eslint-disable import/no-cycle */
import {
  PROFILE_DATA, ALERT,
  PROFILE_COUNT_TIER_LEVEL,
  SUBSCRIPTION_INFO,
  FETCHING_ACTION,
  PROFILE_POPLS,
  PROFILE_POPS,
  PROFILE_CONNECTIONS,
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
import { profileIdsRequest, getProfileAction, makeProfileSubscriberRequest } from "../../pages/profiles/store/actions/requests";
import { getPoplsAction } from "../../pages/popls/store/actions";
import { subscriptionConfig } from "../../pages/billing/index";
import { getCollectionData } from "../../config/firebase.query";
import { popsActionRequest } from "../../pages/overallAnalytics/store/actions/requests";
import { GET_POPS_FOR_POPLS_SUCCESS } from "../../pages/popls/store/actionTypes";
import {
  uniqueObjectsInArray, formatDateConnections, getId, removeCommas,
} from "../../utils";

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
    const dashboardPlan = getState().authReducer.dashboardPlan.data;

    dispatch(fetchingAction(true));
    dispatch(fetchingAction(true, "connectionsSidebar"));
    dispatch(fetchingAction(true, "profilesSidebar"));
    dispatch(fetchingAction(true, "poplsSidebar"));
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

    // checking tier level not out of range. if not - checking all profiles to be pro and making pro that unpro
    if (dashboardPlan && subscriptionConfig[dashboardPlan].unitsRange[0] > profiles.length) {
      const unProProfileIds = [];
      profiles.forEach((profile) => {
        if (profile.pro == "0") {
          unProProfileIds.push(profile.id);
        }
      });

      await Promise.all(unProProfileIds.map((id) => makeProfileSubscriberRequest(id)));
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

export const getPoplsForProfilesButton = (popls) => {
  const profilePopls = {};
  popls.forEach((item) => {
    if (profilePopls[item.profileId]) profilePopls[item.profileId] += 1;
    else profilePopls[item.profileId] = 1;
  });

  return {
    type: PROFILE_POPLS,
    payload: profilePopls,
  };
};

export const profilesInfoAction = (profiles) => async (dispatch, getState) => {
  try {
    const profileConnection = {};
    const profilePops = {};

    dispatch({
      type: PROFILE_INFO_FOR_MAIN_PAGE,
      payload: profiles.length,
    });
    try {
      dispatch(getPoplsAction(profiles, POPLS_INFO_SIDEBAR));
    } catch (error) {
      console.log(error);
      dispatch(fetchingAction(false, "poplsSidebar"));
    }

    const connections = await getCollectionData("people", [...profiles.map((el) => el.id)]);

    // calling pops for profile buttons pops count
    const pops = await Promise.all(profiles.map(({ id }) => popsActionRequest(id)));
    pops.forEach((item) => profilePops[item.config.data.get("pid")] = item.data.length);

    connections.forEach(({ data, docId }) => profileConnection[docId] = uniqueObjectsInArray(data.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })), (item) => item.id).length);
    dispatch({
      type: CONNECTIONS_INFO_SIDEBAR,
      payload: uniqueObjectsInArray(connections.reduce((acc, item) => ([...acc, ...item.data]), []), (item) => item.id).length,
    });

    dispatch({
      type: PROFILE_POPS,
      payload: profilePops,
    });

    dispatch({
      type: GET_POPS_FOR_POPLS_SUCCESS,
      payload: pops.reduce((acc, value) => ([...acc, ...value.data]), []),
    });

    dispatch({
      type: PROFILE_CONNECTIONS,
      payload: profileConnection,
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

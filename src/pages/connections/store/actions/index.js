/* eslint-disable no-return-assign */
import { getCollectionData } from "../../../../config/firebase.query";
import { getId } from "../../../../utils/uniqueId";

import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  CLEAR_ADD_CONNECTIONS,
  CLEAR_EDIT_CONNECTIONS,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  SHOW_ALL_CONNECTIONS,
  SHOW_CONNECTIONS_BY_PROFILE_ID,
  CLEAR_CONNECTIONS_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";

import {
  removeCommas, uniqueObjectsInArray, formatDateConnections,
} from "../../../../utils";
import { snackBarAction } from "../../../../store/actions";
import { profileIdsRequest, getProfileAction } from "../../../profiles/store/actions/requests";

export const collectSelectedConnections = (id, isSingle) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true));
    const profileId = getState().authReducer.signIn.data.id;
    const storeProfiles = getState().profilesReducer.dataProfiles.data;
    const profileName = {};
    let idsArray = [];
    if (storeProfiles) {
      storeProfiles.forEach(({ id, ...data }) => {
        idsArray.push(Number(id));
        profileName[id] = { name: data.name, image: data.image };
      });
    } else {
      idsArray = [profileId];
      const { data } = await profileIdsRequest(profileId);

      if (data) {
        JSON.parse(removeCommas(data)).filter((el, index, array) => array.indexOf(el) === index).forEach((id) => idsArray.push(id));
      }

      const profilesData = await Promise.all(idsArray.map((id) => getProfileAction(id)));
      profilesData.forEach(({ data, id }) => profileName[id] = { name: data.name, image: data.image });
    }

    let allConnections = await getCollectionData("people", idsArray);
    // removing duplicated connections from array
    const filteredConnections = uniqueObjectsInArray(allConnections
      .reduce((acc, item) => ([...acc, ...item.data]), []) // in allConnections we have array with profile id's. in each profile id placed array of connections related to this certain profile and we gathering it in one array
      .sort((a, b) => new Date(formatDateConnections(a.time)) - new Date(formatDateConnections(b.time))), // sorting by date. we have to set target date(in our case most recent) in the end of array not to delete it by removing duplicates
    (item) => item.id);
    const idsObject = {}; // object with connections by profile id's without duplicated connections

    allConnections.forEach(({ data, docId }) => idsObject[docId] = uniqueObjectsInArray(data
      .map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) }))
      .sort((a, b) => new Date(formatDateConnections(a.time)) - new Date(formatDateConnections(b.time))), // sorting by date. we have to set target date(in our case most recent) in the end of array not to delete it by removing duplicates
    (item) => item.id)); // removing duplicated connections for each certain profile connections array

    // adding object with connected with names in each connection. one connection could be in different profiles and we need to find relations between all connections and all profiles
    filteredConnections.forEach((con) => {
      const names = {};
      allConnections.forEach(({ data, docId }) => {
        data.forEach((el) => {
          if (el.id === con.id && !("noPopl" in el)) {
            names[docId] = { ...profileName[docId], connected: el.time };
          }
        });
      });
      con.names = names;
      con.customId = Number(getId(12, "1234567890"));
    });

    // sorting connections by date to place more recent connection in the very beginning of the list
    filteredConnections.sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time)));

    // adding object with connected with names in each profile id's connections array item. one connection could be in different profiles and we need to find relations between all connections and all profiles
    Object.values(idsObject).forEach((connections) => {
      connections.forEach((con) => {
        const names = {};
        allConnections.forEach(({ data, docId }) => {
          data.forEach((el) => {
            if (el.id === con.id && !("noPopl" in el)) {
              names[docId] = { ...profileName[docId], connected: el.time };
            }
          });
        });
        con.names = names;
      });
    });
    dispatch({
      type: GET_CONNECTIONS_SUCCESS,
      payload: {
        connectionsObject: idsObject, allConnections: isSingle ? idsObject[id].sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))) : filteredConnections, connections: filteredConnections,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(snackBarAction({
      message: "Server error",
      severity: "error",
      duration: 6000,
      open: true,
    }));
    dispatch({
      type: GET_CONNECTIONS_FAIL,
      error,
    });
  }
};

export const showConnectionByProfile = (profileId) => ({
  type: SHOW_CONNECTIONS_BY_PROFILE_ID,
  payload: profileId,
});

export const showAllConnectionsAction = () => (dispatch) => {
  dispatch(isFetchingAction(true));
  return dispatch({ type: SHOW_ALL_CONNECTIONS });
};

export const getProfilesIdsAction = (userId) => async (dispatch) => {
  try {
    const idsArray = [userId];
    const response = await profileIdsRequest(userId);
    if (response.data) {
      JSON.parse(removeCommas(response.data)).forEach((id) => idsArray.push(id));
    }
    return dispatch({
      type: GET_PROFILES_IDS_SUCCESS,
      payload: idsArray,
    });
  } catch (error) {
    return dispatch({
      type: GET_PROFILES_IDS_FAIL,
      error,
    });
  }
};

export const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const clearAddConnection = () => (dispatch) => {
  dispatch({
    type: CLEAR_ADD_CONNECTIONS,
  });
};

export const clearEditConnection = () => (dispatch) => {
  dispatch({
    type: CLEAR_EDIT_CONNECTIONS,
  });
};

export const clearConnectionData = (name) => ({
  type: CLEAR_CONNECTIONS_DATA,
  payload: name,
});

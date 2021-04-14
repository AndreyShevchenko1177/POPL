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
  CLEAR_CONNECTIONS_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { profileIds, getProfileAction } from "../../../profiles/store/actions/requests";
import { uniqueObjectsInArray, formatDateConnections } from "../../../../utils";

export const collectSelectedConnections = (id, type, isSingle) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true));
    const profileId = getState().authReducer.signIn.data.id;
    const idsArray = [profileId];
    const { data } = await profileIds(profileId);

    if (data) {
      JSON.parse(data).filter((el, index, array) => array.indexOf(el) === index).forEach((id) => idsArray.push(id));
    }
    const profileName = {};
    const profilesData = await Promise.all(idsArray.map((id) => getProfileAction(id)));
    profilesData.forEach(({ data, id }) => profileName[id] = { name: data.name, image: data.image });
    let allConnections = await getCollectionData("people", idsArray);
    const filteredConnections = uniqueObjectsInArray(allConnections.reduce((acc, item) => ([...acc, ...item.data]), []), (item) => item.id);
    const idsObject = {};
    allConnections.forEach(({ data, docId }) => idsObject[docId] = uniqueObjectsInArray(data.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })), (item) => item.id));
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

    filteredConnections.sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time)));

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
        allConnections: isSingle ? idsObject[id] : filteredConnections, connections: filteredConnections,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch(snackBarAction({
      message: "Server error",
      severity: "error",
      duration: 3000,
      open: true,
    }));
    dispatch({
      type: GET_CONNECTIONS_FAIL,
      error,
    });
  }
};

export const showAllConnectionsAction = () => (dispatch) => {
  dispatch(isFetchingAction(true));
  return dispatch({ type: SHOW_ALL_CONNECTIONS });
};

export const getProfilesIdsAction = (userId) => async (dispatch) => {
  try {
    const idsArray = [userId];
    const response = await profileIds(userId);
    if (response.data) {
      JSON.parse(response.data).forEach((id) => idsArray.push(id));
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

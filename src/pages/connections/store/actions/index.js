/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import worker from "workerize-loader!../../worker/worker";
import { getCollectionData } from "../../../../config/firebase.query";

import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  GET_OBJECT_IDS_SUCCESS,
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

const workerInstanse = worker();

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
    let filteredConnections = null;
    let idsObject = null;
    if (isSingle) {
      filteredConnections = await workerInstanse.getFilteredConnections(JSON.stringify({ allConnections, profileName }));
      idsObject = await workerInstanse.getIdsObject(JSON.stringify({ profileName, allConnections }));
      return dispatch({
        type: GET_CONNECTIONS_SUCCESS,
        payload: {
          connectionsObject: idsObject,
          allConnections: isSingle
            ? idsObject[id].sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time)))
            : filteredConnections,
          connections: filteredConnections,
        },
      });
    }
    workerInstanse.getFilteredConnections(JSON.stringify({ allConnections, profileName })).then((filteredConnections) => {
      dispatch({
        type: GET_CONNECTIONS_SUCCESS,
        payload: {
          allConnections: filteredConnections,
          connections: filteredConnections,
        },
      });
    });

    workerInstanse.getIdsObject(JSON.stringify({ profileName, allConnections })).then((idsObject) => {
      dispatch({
        type: GET_OBJECT_IDS_SUCCESS,
        payload: {
          connectionsObject: idsObject,

        },
      });
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

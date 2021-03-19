/* eslint-disable no-return-assign */
import { getCollectionData } from "../../../../config/firebase.query";
import { getId } from "../../../../utils/uniqueId";

import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  ADD_CONNECTIONS_SUCCESS,
  ADD_CONNECTIONS_FAIL,
  EDIT_CONNECTIONS_SUCCESS,
  EDIT_CONNECTIONS_FAIL,
  CLEAR_ADD_CONNECTIONS,
  CLEAR_EDIT_CONNECTIONS,
  COLLECT_SELECTED_CONNECTIONS_REQUEST,
  COLLECT_SELECTED_CONNECTIONS_SUCCESS,
  COLLECT_SELECTED_CONNECTIONS_FAIL,
  RETRIEVE_SELECTED_CONNECTIONS,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  CLEAR_CONNECTIONS_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { profileIds } from "../../../profiles/store/actions";

export const getConnectionsAction = (userId, isSingle) => async (dispatch) => {
  try {
    dispatch(isFetchingAction(true));
    const idsArray = [4822];
    let res = {
      data: null,
    };
    if (!isSingle) {
      res = await profileIds(userId);
    }

    if (res.data) {
      JSON.parse(res.data).forEach((id) => idsArray.push(id));
    }
    const data = await Promise.all(idsArray.map((id) => getCollectionData("people", id)));
    dispatch({
      type: GET_CONNECTIONS_SUCCESS,
      payload: data.reduce((result, current) => ([...result, ...current.data?.history || []]), [])
        .map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })),
    });

    return dispatch(isFetchingAction(false));
  } catch (error) {
    dispatch({
      type: GET_CONNECTIONS_FAIL,
      payload: error,
    });

    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
    return dispatch(isFetchingAction(false));
  }
};

export const addConnectionAction = (body) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CONNECTIONS_SUCCESS,
      payload: "success",
    });

    // dispatch(getPoplsAction());
  } catch (error) {
    dispatch({
      type: ADD_CONNECTIONS_FAIL,
      payload: "Server error",
    });

    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
  }
};

export const editConnectionAction = (body) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CONNECTIONS_SUCCESS,
      payload: "success",
    });
    // dispatch(getPoplsAction());
  } catch (error) {
    dispatch({
      type: EDIT_CONNECTIONS_FAIL,
      payload: "Server error",
    });

    dispatch(
      snackBarAction({
        message: "Server error",
        severity: "error",
        duration: 3000,
        open: true,
      }),
    );
  }
};

export const collectSelectedConnections = (id, type) => async (dispatch) => {
  try {
    dispatch(isFetchingAction(true));
    const idsArray = [id];
    const { data } = await profileIds(id);
    dispatch({
      type: COLLECT_SELECTED_CONNECTIONS_REQUEST,
    });
    if (data) {
      JSON.parse(data).filter((el, index, array) => array.indexOf(el) === index).forEach((id) => idsArray.push(id));
    }
    const result = await Promise.all(idsArray.map((id) => getCollectionData("people", id)));
    const idsObject = {};
    result.forEach(({ data, id }) => idsObject[id] = data.history.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })));

    dispatch({
      type: COLLECT_SELECTED_CONNECTIONS_SUCCESS,
      payload: { ...idsObject, allConnections: Object.values(idsObject).reduce((sum, cur) => ([...sum, ...cur]), []), type },
    });
    return dispatch(isFetchingAction(false));
  } catch (error) {
    dispatch({
      type: COLLECT_SELECTED_CONNECTIONS_FAIL,
      error,
    });

    return dispatch(isFetchingAction(false));
  }
};

export const retieveSelectedConnections = () => ({
  type: RETRIEVE_SELECTED_CONNECTIONS,
});

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

const isFetchingAction = (isFetching) => ({
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

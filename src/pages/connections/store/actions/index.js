/* eslint-disable no-return-assign */
import axios from "axios";
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
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { profileIds } from "../../../profiles/store/actions";

export const getConnectionsAction = (userId) => async (dispatch) => {
  try {
    const idsArray = [userId];
    const res = await profileIds(userId);
    if (res.data) {
      JSON.parse(res.data).forEach((id) => idsArray.push(id));
    }
    const data = await Promise.all(idsArray.map((id) => getCollectionData("people", id)));
    return dispatch({
      type: GET_CONNECTIONS_SUCCESS,
      payload: data.reduce((result, current) => ([...result, ...current.data?.history || []]), []).map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })),
    });
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
  }
};

export const addConnectionAction = (body) => async (dispatch) => {
  try {
    // const addPoplsFormData = new FormData();
    // addPoplsFormData.append("sAction", "AddPopl");
    // addPoplsFormData.append("sName", body.name);
    // addPoplsFormData.append("sSlug", body.slug);
    // addPoplsFormData.append("iMemberID", body.mid);
    // addPoplsFormData.append("ajax", 1);

    // const response = await axios.post("", addPoplsFormData, {
    //   withCredentials: true,
    // });
    // if (
    //   typeof response === "string"
    //   || (response.data && response.data.error)
    // ) {
    //   return dispatch({
    //     type: ADD_CONNECTIONS_FAIL,
    //     payload:
    //       response.data && response.data.error
    //         ? response.data.error
    //         : "Server error",
    //   });
    // }

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
    // const updatePoplsFormData = new FormData();
    // updatePoplsFormData.append("sAction", "UpdatePopl");
    // updatePoplsFormData.append("sName", body.name);
    // updatePoplsFormData.append("sSlug", body.slug);
    // updatePoplsFormData.append("iMemberID", body.mid);
    // updatePoplsFormData.append("iID", body.id);
    // updatePoplsFormData.append("ajax", 1);

    // const response = await axios.post("", updatePoplsFormData, {
    //   withCredentials: true,
    // });
    // if (
    //   typeof response === "string"
    //   || (response.data && response.data.error)
    // ) {
    //   return dispatch({
    //     type: EDIT_CONNECTIONS_FAIL,
    //     payload:
    //       response.data && response.data.error
    //         ? response.data.error
    //         : "Server error",
    //   });
    // }

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

export const collectSelectedConnections = (ids, type) => async (dispatch, getState) => {
  try {
    const { allPopls, data } = getState().poplsReducer.collectPopl;
    // if (data) {
    //   return dispatch({
    //     type: COLLECT_SELECTED_CONNECTIONS_SUCCESS,
    //     payload: allPopls,
    //   });
    // }
    dispatch({
      type: COLLECT_SELECTED_CONNECTIONS_REQUEST,
    });
    const result = await Promise.all(ids.map((id) => getCollectionData("people", id)));
    const idsObject = {};
    result.forEach(({ data, id }) => idsObject[id] = data.history.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })));
    // const result = await (await Promise.all(ids.map((id) => getCollectionData("people", id)))).reduce((result, current) => ([...result, ...current.history]), []);
    // return dispatch({
    //   type: COLLECT_SELECTED_CONNECTIONS_SUCCESS,
    //   payload: result.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })),
    // });
    return dispatch({
      type: COLLECT_SELECTED_CONNECTIONS_SUCCESS,
      payload: { ...idsObject, allConnections: Object.values(idsObject).reduce((sum, cur) => ([...sum, ...cur]), []), type },
    });
  } catch (error) {
    return dispatch({
      type: COLLECT_SELECTED_CONNECTIONS_FAIL,
      error,
    });
  }
};

export const retieveSelectedConnections = () => ({
  type: RETRIEVE_SELECTED_CONNECTIONS,
});

export const getProfilesIdsAction = (userId) => async (dispatch) => {
  try {
    const idsArray = [4822];
    const response = await profileIds(4822);
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

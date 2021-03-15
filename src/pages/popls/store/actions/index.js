/* eslint-disable import/no-cycle */
import axios from "axios";

import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
  COLLECT_SELECTED_POPLS_REQUEST,
  COLLECT_SELECTED_POPLS_SUCCESS,
  RETRIEVE_SELECTED_POPLS,
  COLLECT_SELECTED_POPLS_FAIL,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  CLEAR_ADD_POPL,
  CLEAR_EDIT_POPL,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { profileIds } from "../../../profiles/store/actions";

export const getPoplsData = async () => {
  const getPopolsFormData = new FormData();
  getPopolsFormData.append("sAction", "GetPopls");
  getPopolsFormData.append("ajax", 1);

  const response = await axios.post("", getPopolsFormData, {
    withCredentials: true,
  });
  return response;
};

export const getPoplsDataById = async (id) => {
  const getPopolsFormData = new FormData();
  getPopolsFormData.append("sAction", "GetPoplsForId");
  getPopolsFormData.append("ajax", 1);
  getPopolsFormData.append("iID", id);

  const response = await axios.post("", getPopolsFormData, {
    withCredentials: true,
  });
  return response;
};

export const getPoplsAction = (id) => async (dispatch) => {
  try {
    const idsArray = [id];
    const response = await profileIds(id);
    if (response.data) {
      JSON.parse(response.data).forEach((id) => idsArray.push(id));
    }
    const result = await Promise.all(idsArray.map((id) => getPoplsDataById(id))).then((res) => res.reduce((result, current) => [...result, ...current.data], []));
    if (typeof result === "string") {
      return dispatch(
        snackBarAction({
          message: "Download popls error",
          severity: "error",
          duration: 3000,
          open: true,
        }),
      );
    }
    return dispatch({
      type: GET_POPLS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: GET_POPLS_FAIL,
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

export const addPoplAction = (body) => async (dispatch) => {
  try {
    const addPoplsFormData = new FormData();
    addPoplsFormData.append("sAction", "AddPopl");
    addPoplsFormData.append("sName", body.name);
    addPoplsFormData.append("sSlug", body.slug);
    addPoplsFormData.append("iMemberID", body.mid);
    addPoplsFormData.append("ajax", 1);

    const response = await axios.post("", addPoplsFormData, {
      withCredentials: true,
    });
    if (
      typeof response === "string"
      || (response.data && response.data.error)
    ) {
      return dispatch({
        type: ADD_POPLS_FAIL,
        payload:
          response.data && response.data.error
            ? response.data.error
            : "Server error",
      });
    }

    dispatch({
      type: ADD_POPLS_SUCCESS,
      payload: "success",
    });

    dispatch(getPoplsAction());
  } catch (error) {
    dispatch({
      type: ADD_POPLS_FAIL,
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

export const editPoplAction = (body) => async (dispatch) => {
  try {
    const updatePoplsFormData = new FormData();
    updatePoplsFormData.append("sAction", "UpdatePopl");
    updatePoplsFormData.append("sName", body.name);
    updatePoplsFormData.append("sSlug", body.slug);
    updatePoplsFormData.append("iMemberID", body.mid);
    updatePoplsFormData.append("iID", body.id);
    updatePoplsFormData.append("ajax", 1);

    const response = await axios.post("", updatePoplsFormData, {
      withCredentials: true,
    });
    if (
      typeof response === "string"
      || (response.data && response.data.error)
    ) {
      return dispatch({
        type: EDIT_POPLS_FAIL,
        payload:
          response.data && response.data.error
            ? response.data.error
            : "Server error",
      });
    }

    dispatch({
      type: EDIT_POPLS_SUCCESS,
      payload: "success",
    });
    dispatch(getPoplsAction());
  } catch (error) {
    dispatch({
      type: EDIT_POPLS_FAIL,
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

export const collectSelectedPopls = (ids, type) => async (dispatch, getState) => {
  try {
    const { allPopls, data } = getState().poplsReducer.collectPopl;
    if (data) {
      return dispatch({
        type: COLLECT_SELECTED_POPLS_SUCCESS,
        payload: allPopls,
      });
    }
    dispatch({
      type: COLLECT_SELECTED_POPLS_REQUEST,
    });
    const result = await Promise.all(ids.map((id) => getPoplsDataById(id))).then((res) => res.reduce((result, current) => [...result, ...current.data], []));
    return dispatch({
      type: COLLECT_SELECTED_POPLS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    return dispatch({
      type: COLLECT_SELECTED_POPLS_FAIL,
      error,
    });
  }
};

export const retieveSelectedPopls = () => ({
  type: RETRIEVE_SELECTED_POPLS,
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

export const clearAddPopl = () => (dispatch) => {
  dispatch({
    type: CLEAR_ADD_POPL,
  });
};

export const clearEditPopl = () => (dispatch) => {
  dispatch({
    type: CLEAR_EDIT_POPL,
  });
};

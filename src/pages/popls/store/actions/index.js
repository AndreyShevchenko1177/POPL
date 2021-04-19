/* eslint-disable import/no-cycle */
import axios from "axios";

import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
  CLEAR_ADD_POPL,
  CLEAR_EDIT_POPL,
  CLEAR_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";
import { getId } from "../../../../utils";
import { snackBarAction } from "../../../../store/actions";
import { profileIds } from "../../../profiles/store/actions/requests";
import * as requests from "./requests";

export const getPoplsAction = (id, isSingle) => async (dispatch, getState) => {
  try {
    const storeProfiles = getState().profilesReducer.dataProfiles.data;
    const storePopls = getState().poplsReducer.allPopls.data;

    if (!storePopls.length) {
      dispatch(isFetchingAction(true));
      let result;
      if (!storeProfiles) {
        const idsArray = [id];
        let response = {
          data: null,
        };
        if (!isSingle) {
          response = await profileIds(id);
        }

        if (response.data) {
          JSON.parse(response.data).filter((el, index, array) => array.indexOf(el) === index).forEach((id) => idsArray.push(id));
        }
        result = await Promise.all(idsArray.map((id) => requests.addProfileNamesToPopls(id)))
          .then((res) => res.reduce((result, current) => [...result, ...current], []));
        if (typeof result === "string") {
          dispatch(isFetchingAction(false));
          return dispatch(
            snackBarAction({
              message: "Download popls error",
              severity: "error",
              duration: 3000,
              open: true,
            }),
          );
        }
      } else {
        result = await Promise.all(storeProfiles.map((profile) => requests.getPoplsFromProfiles(profile)))
          .then((res) => res.reduce((result, current) => [...result, ...current], []));
      }
      return dispatch({
        type: GET_POPLS_SUCCESS,
        payload: result.map((el) => ({ ...el, customId: Number(getId(12, "1234567890")) })),
      });
    }
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
    return dispatch(isFetchingAction(false));
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

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

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

export const clearData = (name) => ({
  type: CLEAR_DATA,
  payload: name,
});

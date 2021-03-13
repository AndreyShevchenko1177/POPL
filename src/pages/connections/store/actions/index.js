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
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";

export const getConnectionsAction = (userId) => async (dispatch) => {
  try {
    const data = await getCollectionData("people", "4822");
    return dispatch({
      type: GET_CONNECTIONS_SUCCESS,
      payload: data.history.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })),
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
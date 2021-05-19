/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
import axios from "axios";

import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_REQUEST,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
  CLEAR_ADD_POPL,
  CLEAR_EDIT_POPL,
  CLEAR_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";
import { getId } from "../../../../utils";
import { snackBarAction, getPoplsForProfilesButton } from "../../../../store/actions";
import { GET_DATA_PROFILES_SUCCESS } from "../../../profiles/store/actionTypes";
import { uploadImage } from "../../../../config/firebase.query";

import * as requests from "./requests";

export const getPoplsAction = (profiles, poplsInfoSideBarType) => async (dispatch, getState) => {
  try {
    dispatch(isFetchingAction(true));
    const popls = await Promise.all(profiles.map((profile) => requests.getPoplsFromProfiles(profile)))
      .then((res) => res.reduce((result, current) => [...result, ...current], []));
    dispatch(getPoplsForProfilesButton(popls));
    dispatch({
      type: GET_POPLS_SUCCESS,
      payload: popls.map((el) => ({ ...el, customId: Number(getId(12, "1234567890")) })),
    });
    dispatch({
      type: GET_DATA_PROFILES_SUCCESS,
      payload: profiles,
    });
    dispatch({
      type: poplsInfoSideBarType,
      payload: popls.length,
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
    dispatch(isFetchingAction(false));
    // throw new Error();
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

export const updatePopl = (memberId, id, photo, nickname, fetchedParam) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_POPLS_REQUEST,
      payload: { [id]: { [fetchedParam]: true } },
    });
    let uploadedFile;
    let result;
    if (photo && typeof photo !== "string") {
      uploadedFile = getId(12);
      result = await uploadImage(new File([photo], `${uploadedFile}`, { type: photo.type }), "poplPhotos");
    }

    // file name that uplaods is differents of file name that downloads after that. I've faced it just when uploading in custom folder
    let fileName;
    if (result) {
      fileName = result
        .split("?")[0]
        .split("poplPhotos%")[1];
    }
    await requests.updatePoplRequest(memberId, id, fileName || photo, nickname);
    dispatch({
      type: EDIT_POPLS_SUCCESS,
      payload: {
        id, photo: fileName || photo, nickname,
      },
    });
  } catch (error) {
    console.log(error);
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

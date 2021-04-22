/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
import { snackBarAction, profileCountTierLevelAction, profilesInfoAction } from "../../../../store/actions";
import { getId } from "../../../../utils";
import {
  CLEAR_STATE,
  IS_DATA_FETCHING,
} from "../actionTypes";
import * as requests from "./requests";

export const updateUserProfile = ({ name, color, websiteLink }) => async (dispatch) => {
  try {
    if (name) await requests.setCompanyColor(color);
    if (color) await requests.setCompanyName(name);
    if (websiteLink) await requests.setCompanyWebSite(websiteLink);
  } catch (error) {
    console.log(error);
  }
};

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const clearStateAction = (name) => (dispatch) => dispatch({
  type: CLEAR_STATE,
  payload: name,
});

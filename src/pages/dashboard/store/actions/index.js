/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  GET_POPS_DASHBOARD_SUCCESS,
  IS_DATA_FETCHING,
} from "../actionTypes";

import { filterPops } from "../../../../utils";
import { popsActionRequest } from "../../../overallAnalytics/store/actions/requests";

export const getPopsAction = () => async (dispatch, getState) => {
  try {
    const profilesData = getState().profilesReducer.dataProfiles.data;
    const userIdsArray = profilesData.map(({ id }) => id);

    // get all pops for all profiles
    Promise.all(userIdsArray.map((id) => popsActionRequest(id)))
      .then((res) => {
        const poplPops = [];
        const qrCodePops = [];
        const walletPops = [];
        res.map(({ data }) => data).reduce((sum, cur) => ([...sum, ...cur]), []).forEach((pop) => {
          if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
          if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
          if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
        });
        return dispatch({
          type: GET_POPS_DASHBOARD_SUCCESS,
          payload: {
            poplPops, qrCodePops, walletPops, allPops: [...poplPops, ...qrCodePops, ...walletPops],
          },
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const isFetchingAction = (isFetching, name) => ({
  type: IS_DATA_FETCHING,
  payload: name ? { isFetching, name } : isFetching,
});

/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  GET_POPS_SUCCESS,
  GET_POPS_FAIL,
  GET_TOP_STATISTICS_SUCCESS,
  IS_DATA_FETCHING, CLEAN,
  INDIVIDUAL_POPS_COUNT,
  DASHBOARD_POPS_DATA,
  CLEAN_BY_NAME,
  GET_LINK_TAPS_BOTTOM,
  GET_VIEWS_BOTTOM,
  GET_LINKS_TOP,
  GET_VIEWS_TOP,
  TOP_VIEWED_PROFILES,
  TOTAL_POPLS,
  POPS_COUNT_TOP,
} from "../actionTypes";

import { removeCommas, getId, filterPops } from "../../../../utils";
import { snackBarAction } from "../../../../store/actions";
import { getPoplsDataById } from "../../../popls/store/actions/requests";
import { profileIdsRequest, getProfileAction } from "../../../profiles/store/actions/requests";
import * as requests from "./requests";

export const getPopsAction = (userId, poplName) => async (dispatch, getState) => {
  try {
    const { id } = getState().authReducer.signIn.data;
    let result;
    if (!userId) {
      const { data } = await profileIdsRequest(id);
      let response;
      if (data) {
        const ids = JSON.parse(removeCommas(data));
        response = await Promise.all([...ids, id].map((id) => requests.popsActionRequest(id)));
      } else {
        response = await Promise.all([id].map((id) => requests.popsActionRequest(id)));
      }

      result = response.map(({ data }) => data).reduce((sum, cur) => ([...sum, ...cur]), []);
      const poplPops = [];
      const qrCodePops = [];
      const walletPops = [];

      if (poplName) {
        let widgetsStats = {};
        let topViewedViews = [];
        let idsArray = [id];
        if (data) {
          idsArray = JSON.parse(removeCommas(data));
        }
        topViewedViews = await Promise.all([...idsArray, id].map((id) => requests.getAllThreeStats(id)));
        widgetsStats.topViewedProfiles = [...topViewedViews.sort((a, b) => Number(b.data.views) - Number(a.data.views))];

        dispatch({
          type: TOP_VIEWED_PROFILES,
          payload: [...topViewedViews.sort((a, b) => Number(b.data.views) - Number(a.data.views))],
        });

        const popls = await Promise.all([...idsArray, id].map((el) => getPoplsDataById(el)));
        const pops = await Promise.all([...idsArray, id].map((el) => requests.popsActionRequest(el)));
        const topPoppedPopls = {};
        popls
          .reduce((acc, popls) => [...acc, ...popls.data], [])
          .forEach((popl) => topPoppedPopls[popl.name] = []);

        pops
          .reduce((acc, pops) => [...acc, ...pops.data], [])
          .forEach((pop) => {
            const name = filterPops.slicePoplNameFromPop(pop[1]);
            if (name && name in topPoppedPopls) topPoppedPopls[name].push(pop);
          });

        widgetsStats.topPoppedPopls = Object.keys(topPoppedPopls)
          .map((key) => ({ [key]: topPoppedPopls[key] }))
          .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);

        result = result.filter((pop) => filterPops.slicePoplNameFromPop(pop[1]) === poplName);
        widgetsStats.popsCount = result.length;
        dispatch({
          type: GET_TOP_STATISTICS_SUCCESS,
          payload: widgetsStats,
        });

        result.forEach((pop) => {
          if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
          if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
          if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
        });

        // settingTopStatistics
        dispatch({
          type: POPS_COUNT_TOP,
          payload: [...poplPops, ...qrCodePops, ...walletPops],
        });
        dispatch({
          type: TOTAL_POPLS,
          payload: null,
        });
        dispatch({
          type: GET_VIEWS_TOP,
          payload: null,
        });
        dispatch({
          type: GET_LINKS_TOP,
          payload: null,
        });
        dispatch({
          type: GET_LINK_TAPS_BOTTOM,
          payload: null,
        });
        dispatch({
          type: GET_VIEWS_BOTTOM,
          payload: null,
        });
      } else {
        result.forEach((pop) => {
          if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
          if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
          if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
        });
      }
      result = {
        poplPops, qrCodePops, walletPops, allPops: [...poplPops, ...qrCodePops, ...walletPops],
      };
      if (!poplName) {
        dispatch({
          type: DASHBOARD_POPS_DATA,
          payload: result,
        });
      }
    } else {
      const response = await requests.popsActionRequest(userId);
      if (typeof response === "string") {
        dispatch(
          snackBarAction({
            message: "Download pops error",
            severity: "error",
            duration: 3000,
            open: true,
          }),
        );
        return dispatch({
          type: GET_POPS_FAIL,
          payload: "error",
        });
      }

      const poplPops = [];
      const qrCodePops = [];
      const walletPops = [];
      response.data.forEach((pop) => {
        if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
        if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
        if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
      });
      // const totalPops = [...poplPops, ...qrCodePops, ...walletPops];
      result = {
        poplPops, qrCodePops, walletPops, allPops: [...poplPops, ...qrCodePops, ...walletPops],
      };
    }

    return dispatch({
      type: GET_POPS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_POPS_FAIL,
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

export const getStatisticItemsRequest = () => async (dispatch, getState) => {
  dispatch(cleanActionName("topStatisticsData"));
  const storeProfiles = getState().profilesReducer.dataProfiles.data;
  return dispatch(getStatisticItem(storeProfiles));
};

export const getStatisticItem = (profiles, isSingle) => async (dispatch, getState) => {
  try {
    const storeProfiles = getState().profilesReducer.dataProfiles.data;
    dispatch(cleanActionName("topStatisticsData"));

    // FETCHING POPS
    Promise.all(profiles.map((el) => requests.popsActionRequest(el.id)))
      .then((res) => {
        dispatch({
          type: POPS_COUNT_TOP,
          payload: res.reduce((acc, value) => ([...acc, ...value.data]), []),
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(isFetchingAction(false, "popsCountTop"));
      });

    // FETCHING POPLS
    Promise.all(profiles.map((el) => getPoplsDataById(el.id)))
      .then((res) => {
        dispatch({
          type: TOTAL_POPLS,
          payload: res.reduce((acc, value) => ([...acc, ...value.data]), []),
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(isFetchingAction(false, "totalPopls"));
      });

    Promise.all(profiles.map((el) => requests.getAllThreeStats(el.id)))
      .then((res) => {
        dispatch({
          type: GET_VIEWS_TOP,
          payload: res.reduce((a, b) => a + b.data.views, 0),
        });

        if (isSingle) {
          // if individual profile level
          Promise.all(storeProfiles.map((el) => requests.getAllThreeStats(el.id)))
            .then((res) => {
              dispatch({
                type: TOP_VIEWED_PROFILES,
                payload: [...res.sort((a, b) => Number(b.data.views) - Number(a.data.views))],
              });
            });
        } else {
          dispatch({
            type: TOP_VIEWED_PROFILES,
            payload: [...res.sort((a, b) => Number(b.data.views) - Number(a.data.views))],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(isFetchingAction(false, "topViewedProfiles"));
      });

    dispatch(getLinkTapsAction(profiles.map((el) => el.id)));
    dispatch(getViewsByDate(profiles.map((el) => el.id)));
    dispatch({
      type: GET_LINKS_TOP,
      payload: `${profiles.map((pr) => [...pr.business, ...pr.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)).reduce((sum, value) => sum += value, 0)}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const individualPopsCountAction = (number) => ({
  type: INDIVIDUAL_POPS_COUNT,
  payload: number,
});

export const getLinkTapsAction = (profileId) => async (dispatch) => {
  try {
    const linkTaps = await Promise.all(profileId.map((id) => requests.getLinkTaps(id)));

    dispatch({
      type: GET_LINK_TAPS_BOTTOM,
      payload: linkTaps.reduce((acc, value) => ([...acc, ...value.data]), []),
    });
  } catch (error) {
    console.log(error);
    dispatch(isFetchingAction(false, "linkTapsBottom"));
  }
};

export const getViewsByDate = (profileId) => async (dispatch) => {
  try {
    const views = await Promise.all(profileId.map((id) => requests.getViews(id)));

    dispatch({
      type: GET_VIEWS_BOTTOM,
      payload: views.reduce((acc, value) => ([...acc, ...value.data]), []),
    });
  } catch (error) {
    console.log(error);
    dispatch(isFetchingAction(false, "viewsBottom"));
  }
};

export const isFetchingAction = (isFetching, name) => ({
  type: IS_DATA_FETCHING,
  payload: name ? { isFetching, name } : isFetching,
});

export const cleanAction = () => ({
  type: CLEAN,
});

export const cleanActionName = (name) => ({
  type: CLEAN_BY_NAME,
  payload: name,
});

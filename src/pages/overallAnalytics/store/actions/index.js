/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_TOP_STATISTICS_SUCCESS, IS_DATA_FETCHING, CLEAN, INDIVIDUAL_POPS_COUNT, CLEAN_BY_NAME,
} from "../actionTypes";

import { snackBarAction } from "../../../../store/actions";
import { getPoplsDataById } from "../../../popls/store/actions/requests";
import { profileIds, getProfileAction } from "../../../profiles/store/actions/requests";
import { getId, filterPops } from "../../../../utils";
import * as requests from "./requests";

export const getPopsAction = (userId, poplName) => async (dispatch, getState) => {
  try {
    const { id } = getState().authReducer.signIn.data;
    let result;
    if (!userId) {
      const { data } = await profileIds(id);
      let response;
      if (data) {
        const ids = JSON.parse(data);
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
          idsArray = JSON.parse(data);
        }
        console.log([...idsArray, id]);
        topViewedViews = await Promise.all([...idsArray, id].map((id) => requests.getAllThreeStats(id)));
        widgetsStats.topViewedProfiles = [...topViewedViews.sort((a, b) => Number(b.data.views) - Number(a.data.views))];
        const popls = await Promise.all([...idsArray, id].map((el) => getPoplsDataById(el)));
        const pops = await Promise.all([...idsArray, id].map((el) => requests.popsActionRequest(el)));
        console.log(popls);
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

        console.log(widgetsStats);

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
      }
      result.forEach((pop) => {
        if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
        if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
        if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
      });

      // const totalPops = [...poplPops, ...qrCodePops, ...walletPops];
      result = {
        poplPops, qrCodePops, walletPops, allPops: [...poplPops, ...qrCodePops, ...walletPops],
      };
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

export const getStatisticItemsRequest = (userId) => async (dispatch) => {
  dispatch(cleanActionName("topStatisticsData"));
  const myProfile = await getProfileAction(userId);
  const response = await profileIds(userId);
  if (response.data) {
    const idsArray = JSON.parse(response.data);
    const result = await Promise.all(idsArray.map((id) => getProfileAction(id)));
    const profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
      ...p,
      customId: getId(12),
      business: p.business,
      social: p.social,
    }));
    return dispatch(getStatisticItem(profiles));
  }
  let correctProfile = { customId: getId(12), id: myProfile.id };
  Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
  return dispatch(getStatisticItem(correctProfile));
};

export const getStatisticItem = (profiles) => async (dispatch, getState) => {
  try {
    dispatch(cleanActionName("topStatisticsData"));
    let result = {};
    if (!Array.isArray(profiles)) {
      const userId = getState().authReducer.signIn.data.id;
      const views = await requests.getAllThreeStats(profiles.id);
      const profilesIds = await profileIds(userId);
      let topViewedViews = [];
      if (profilesIds.data) {
        const idsArray = JSON.parse(profilesIds.data);
        topViewedViews = await Promise.all([...idsArray, userId].map((id) => requests.getAllThreeStats(id)));
      }

      result.totalProfiles = "1";
      result.linkTaps = `${[...profiles.business, ...profiles.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)}`;
      const { data } = await requests.popsActionRequest(profiles.id);
      result.popsCount = data.length;
      const popls = await getPoplsDataById(profiles.id);
      result.totalPopls = `${popls.data.length}`;
      result.views = views.data.views;
      result.topViewedProfiles = [...topViewedViews.sort((a, b) => Number(b.data.views) - Number(a.data.views))];
      result.views = topViewedViews.reduce((a, b) => a + b.data.views, 0);
      const topPoppedPopls = {};
      popls.data.forEach((popl) => topPoppedPopls[popl.name] = []);
      data.forEach((pop) => {
        const name = filterPops.slicePoplNameFromPop(pop[1]);
        if (name && name in topPoppedPopls) topPoppedPopls[name].push(pop);
      });

      result.topPoppedPopls = Object.keys(topPoppedPopls)
        .map((key) => ({ [key]: topPoppedPopls[key] }))
        .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);
    } else {
      result.totalProfiles = `${profiles.length}`;
      result.linkTaps = `${profiles.map((pr) => [...pr.business, ...pr.social].reduce((sum, { clicks }) => sum += Number(clicks), 0)).reduce((sum, value) => sum += value, 0)}`;
      const data = await Promise.all(profiles.map((el) => requests.popsActionRequest(el.id)));
      const popls = await Promise.all(profiles.map((el) => getPoplsDataById(el.id)));
      const views = await Promise.all(profiles.map((el) => requests.getAllThreeStats(el.id)));
      result.totalPopls = popls.reduce((sum, value) => sum += value.data.length, 0);
      result.popsCount = data.reduce((a, b) => a + b.data.length, 0);
      result.topViewedProfiles = [...views.sort((a, b) => Number(b.data.views) - Number(a.data.views))];
      result.views = views.reduce((a, b) => a + b.data.views, 0);
      const topPoppedPopls = {};
      popls
        .reduce((acc, popls) => [...acc, ...popls.data], [])
        .forEach((popl) => topPoppedPopls[popl.name] = []);

      data
        .reduce((acc, pops) => [...acc, ...pops.data], [])
        .forEach((pop) => {
          const name = filterPops.slicePoplNameFromPop(pop[1]);
          if (name && name in topPoppedPopls) topPoppedPopls[name].push(pop);
        });

      result.topPoppedPopls = Object.keys(topPoppedPopls)
        .map((key) => ({ [key]: topPoppedPopls[key] }))
        .sort((a, b) => Object.values(b)[0].length - Object.values(a)[0].length);
    }

    return dispatch({
      type: GET_TOP_STATISTICS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const individualPopsCountAction = (number) => ({
  type: INDIVIDUAL_POPS_COUNT,
  payload: number,
});

const isFetchingAction = (isFetching) => ({
  type: IS_DATA_FETCHING,
  payload: isFetching,
});

export const cleanAction = () => ({
  type: CLEAN,
});

export const cleanActionName = (name) => ({
  type: CLEAN_BY_NAME,
  payload: name,
});

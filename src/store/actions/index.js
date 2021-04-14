/* eslint-disable no-return-assign */
/* eslint-disable import/no-cycle */
import axios from "axios";
import {
  PROFILE_DATA, ALERT, PROFILE_INFO_FOR_SIDE_BAR, PROFILE_COUNT_TIER_LEVEL, SUBSCRIPTION_INFO,
} from "../actionTypes";
import { profileIds, getProfileAction } from "../../pages/profiles/store/actions/requests";
import { getPoplsDataById } from "../../pages/popls/store/actions/requests";
import { popsActionRequest } from "../../pages/overallAnalytics/store/actions/requests";
import { getCollectionData } from "../../config/firebase.query";
import { uniqueObjectsInArray, formatDateConnections, getId } from "../../utils";

export const getProfileData = (data) => ({
  type: PROFILE_DATA,
  payload: data,
});

export const snackBarAction = (payload) => ({
  type: ALERT,
  payload,
});

export const getProfileInfoRequest = (userId) => async (dispatch) => {
  const myProfile = await getProfileAction(userId);
  const response = await profileIds(userId);
  if (response.data && response.data !== "null") {
    const idsArray = JSON.parse(response.data);
    const result = await Promise.all(idsArray.map((id) => getProfileAction(id)));
    const profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
      ...p,
      customId: getId(12),
      business: p.business,
      social: p.social,
    }));
    return dispatch(profilesInfo(profiles, userId));
  }
  let correctProfile = { customId: getId(12), id: myProfile.id };
  Object.keys(myProfile.data).forEach((el) => correctProfile[el] = myProfile.data[el]);
  return dispatch(profilesInfo([correctProfile], userId));
};

export const profileCountTierLevelAction = (number) => ({
  type: PROFILE_COUNT_TIER_LEVEL,
  payload: number,
});

export const profilesInfo = (profiles) => async (dispatch) => {
  try {
    let result = {};
    result.totalProfiles = `${profiles.length}`;
    const popls = await Promise.all(profiles.map((el) => getPoplsDataById(el.id)));
    const pops = await Promise.all(profiles.map((el) => popsActionRequest(el.id)));
    result.totalPopls = popls.reduce((sum, value) => sum += value.data.length, 0);
    const connections = await getCollectionData("people", [...profiles.map((el) => el.id)]);
    const profileConnection = {};
    const poplsConnection = {};
    const popsConnection = {};
    popls.forEach((item) => poplsConnection[item.config.data.get("iID")] = item.data.length);
    pops.forEach((item) => popsConnection[item.config.data.get("pid")] = item.data.length);
    connections.forEach(({ data, docId }) => profileConnection[docId] = uniqueObjectsInArray(data.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })), (item) => item.id).length);
    result.connections = uniqueObjectsInArray(connections.reduce((acc, item) => ([...acc, ...item.data]), []), (item) => item.id).length;
    result.latestConnections = uniqueObjectsInArray(connections
      .reduce((acc, item) => ([...acc, ...item.data])
        .sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))), []), (item) => item.id)
      .slice(0, 10);

    dispatch({
      type: PROFILE_INFO_FOR_SIDE_BAR,
      payload: {
        result, profileConnection, poplsConnection, popsConnection,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriptionInfoAction = ({ subscriptionName, maxProfiles }) => ({
  type: SUBSCRIPTION_INFO,
  payload: {
    subscriptionName,
    maxProfiles,
  },
});

// export const getPopsAction = (userId, poplName) => async (dispatch, getState) => {
//   try {
//     const { id } = getState().authReducer.signIn.data;
//     let result;
//       const response = await requests.popsActionRequest(userId);
//       if (typeof response === "string") {
//         dispatch(
//           snackBarAction({
//             message: "Download pops error",
//             severity: "error",
//             duration: 3000,
//             open: true,
//           }),
//         );
//         return dispatch({
//           type: GET_POPS_FAIL,
//           payload: "error",
//         });
//       }

//       const poplPops = [];
//       const qrCodePops = [];
//       const walletPops = [];
//       response.data.forEach((pop) => {
//         if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
//         if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
//         if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
//       });
//       // const totalPops = [...poplPops, ...qrCodePops, ...walletPops];
//       result = {
//         poplPops, qrCodePops, walletPops, allPops: [...poplPops, ...qrCodePops, ...walletPops],
//       };

//     return dispatch({
//       type: GET_POPS_SUCCESS,
//       payload: result,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: GET_POPS_FAIL,
//       payload: error,
//     });

//     dispatch(
//       snackBarAction({
//         message: "Server error",
//         severity: "error",
//         duration: 3000,
//         open: true,
//       }),
//     );
//   }
// };

/* eslint-disable no-return-assign */
/* eslint-disable import/no-cycle */
import axios from "axios";
import {
  PROFILE_DATA, ALERT,
  PROFILE_COUNT_TIER_LEVEL,
  SUBSCRIPTION_INFO,
  FETCHING_ACTION,
  PROFILE_POPLS,
  PROFILE_POPS,
  PROFILE_CONNECTIONS,
  SHOW_RESTRICTED_MODE,
  PROFILE_INFO_FOR_MAIN_PAGE,
  HANDLE_MAIN_PAGE_SCROLL,
  PROFILES_INFO_SIDEBAR,
  POPLS_INFO_SIDEBAR,
  CONNECTIONS_INFO_SIDEBAR,
  LATEST_CONNECTIONS,
  SET_METERED_SUB_QUANTITY,
} from "../actionTypes";
import { profileIdsRequest, getProfileAction, makeProfileSubscriberRequest } from "../../pages/profiles/store/actions/requests";
import { getPoplsAction } from "../../pages/popls/store/actions";
import { subscriptionConfig } from "../../pages/billing/index";
import { getCollectionData } from "../../config/firebase.query";
import { popsActionRequest } from "../../pages/overallAnalytics/store/actions/requests";
import { GET_POPS_FOR_POPLS_SUCCESS } from "../../pages/popls/store/actionTypes";
import { GET_DATA_PROFILES_SUCCESS } from "../../pages/profiles/store/actionTypes";
import { isFetchingAction as isFetchingProfilesAction, usageRecordAction } from "../../pages/profiles/store/actions";
import {
  uniqueObjectsInArray, formatDateConnections, getId, filterPops,
} from "../../utils";

export const getProfileData = (data) => ({
  type: PROFILE_DATA,
  payload: data,
});

export const snackBarAction = (payload) => ({
  type: ALERT,
  payload,
});

// main action for getting profiles. called in app.js
export const getProfileInfoRequest = (userId) => async (dispatch, getState) => {
  try {
    const dashboardPlan = getState().authReducer.dashboardPlan.data;

    // setting all needed prrloaders
    dispatch(fetchingAction(true));
    dispatch(fetchingAction(true, "connectionsSidebar"));
    dispatch(fetchingAction(true, "profilesSidebar"));
    dispatch(fetchingAction(true, "poplsSidebar"));
    dispatch(isFetchingProfilesAction(true));
    // ==================

    let profilesData; // = //getState().profilesReducer.dataProfiles.data;
    let profiles;
    if (!profilesData) {
      const myProfile = await getProfileAction(userId);
      const response = await profileIdsRequest(userId);
      let idsArray;
      profiles = [{ ...myProfile.data, id: myProfile.id, customId: getId(12) }];
      if (response.data && response.data !== "null") {
        idsArray = JSON.parse((response.data));
        const result = await Promise.all(idsArray.map((id) => getProfileAction(id)));
        profiles = [{ ...myProfile.data, id: myProfile.id }, ...result.map((el) => ({ ...el.data, id: el.id }))].map((p) => ({
          ...p,
          name: p.name?.replace(/[\\]/g, "") || "",
          url: p.url?.replace(/[\\]/g, "") || "",
          customId: getId(12),
          business: p.business,
          social: p.social,
        }));
      }
    } else {
      profiles = profilesData;
    }
    const [subsItemId, subscriptionId] = profiles[0].stripeSubscription.split("%");
    // timeout should be called just once when trial period expires
    // if ((trialPeriodTime - new Date().getTime()) >= new Date().getTime() - 20000) {
    //   setTimeout(() => {
    //     usageRecordAction(subsItemId, profiles.length, Math.round(new Date().getTime() / 1000));
    //   }, trialPeriodTime - new Date().getTime());
    // }

    // this calling every time we loading profiles to set actual number of accounts in stripe usage records
    if (subsItemId) {
      if (dashboardPlan === "10") {
        usageRecordAction(subsItemId, profiles.length, Math.round(new Date().getTime() / 1000))
          .then(() => { // after successfully usage record call getting actual usage quantity
            if (profiles && profiles[0]?.stripeCustomer) {
              const getSubscriptionItemId = new FormData();
              getSubscriptionItemId.append("sAction", "EnterpriseGetSubscriptionQuantity");
              getSubscriptionItemId.append("sCustomerId", profiles[0].stripeCustomer);

              axios.post("", getSubscriptionItemId, {
                withCredentials: true,
              })
                .then((res) => {
                  const getQuantity = (data) => {
                    const subscription = subscriptionConfig.find(({ id }) => id == "10"); // getting priceId from subscription and checking then in stripe response to ensure that it's right subscription
                    if (subscription && (data?.lines?.data && data.lines.data[0]?.price?.id === subscription.priceId) && data.lines.data[0]?.quantity) return data.lines.data[0].quantity;
                    return null;
                  };
                  dispatch({
                    type: SET_METERED_SUB_QUANTITY,
                    payload: getQuantity(res.data),
                  });
                })
                .catch((err) => console.error(err));
            }
          });
      }
    }

    dispatch({
      type: PROFILES_INFO_SIDEBAR,
      payload: profiles.length,
    });

    // checking tier level not out of range. if not - checking all profiles to be pro and making pro that unpro
    if (dashboardPlan) {
      const unProProfileIds = [];
      profiles.forEach((profile) => {
        if (profile.pro == "0") {
          unProProfileIds.push(profile.id);
        }
      });
      if (unProProfileIds.length) {
        if (subscriptionConfig[dashboardPlan == 10 ? 4 : dashboardPlan - 1].unitsRange[1] >= profiles.length) { // checking if profiles length in tier making all profiles pro
          Promise.all(unProProfileIds.map((id) => makeProfileSubscriberRequest(id)))
            .then(() => {
              const result = profiles.map((profile) => {
                if (unProProfileIds.includes(profile.id)) {
                  profile.pro = "1"; // setting pro for new and mapped array cause it's asynchronus calls and we can't know which one fulfilled first
                  return { ...profile, pro: "1" };
                }
                return profile;
              });
              console.log(result, "system");
              dispatch({
                type: GET_DATA_PROFILES_SUCCESS,
                payload: result,
              });
            });
        }
        // =====THIS WAS USED TO MAKE PRO AS MUCH PROFILES AS TIER LEVEL ALLOWS===
        // else {
        //   // we not in tier level - we need calculate how much profiles we could made pro to reach limit
        //   const allowedCount = unProProfileIds.length - (profiles.length - subscriptionConfig[dashboardPlan - 1].unitsRange[1]);
        //   Promise.all(unProProfileIds.slice(0, allowedCount).map((id) => makeProfileSubscriberRequest(id)));
        // }
      }
    }

    dispatch(profileCountTierLevelAction(profiles.length)); // updating data for tier level sectin in sidebar
    return dispatch(profilesInfoAction(profiles));
  } catch (error) {
    console.log(error);
    dispatch(fetchingAction(false, "profilesSidebar"));
    dispatch(isFetchingProfilesAction(true));
  }
};

export const profileCountTierLevelAction = (number) => ({
  type: PROFILE_COUNT_TIER_LEVEL,
  payload: number,
});

export const getPoplsForProfilesButton = (popls) => {
  const profilePopls = {};
  popls.forEach((item) => {
    if (profilePopls[item.profileId]) profilePopls[item.profileId] += 1;
    else profilePopls[item.profileId] = 1;
  });

  return {
    type: PROFILE_POPLS,
    payload: profilePopls,
  };
};

export const profilesInfoAction = (profiles) => async (dispatch, getState) => {
  try {
    const profileConnection = {};
    const profilePops = {};

    dispatch({
      type: PROFILE_INFO_FOR_MAIN_PAGE,
      payload: profiles.length,
    });
    try {
      dispatch(getPoplsAction(profiles, POPLS_INFO_SIDEBAR));
    } catch (error) {
      console.log(error);
      dispatch(fetchingAction(false, "poplsSidebar"));
    }

    const connections = await getCollectionData("people", [...profiles.map((el) => el.id)]);

    // calling pops for profile buttons pops count
    const pops = await Promise.all(profiles.map(({ id }) => popsActionRequest(id)));
    pops.forEach((item) => profilePops[item.config.data.get("pid")] = item.data.length);
    const poplPops = [];
    const qrCodePops = [];
    const walletPops = [];
    pops.map(({ data }) => data).reduce((sum, cur) => ([...sum, ...cur]), []).forEach((pop) => {
      if (filterPops.filterPoplPops(pop[1])) return poplPops.push(pop);
      if (filterPops.filterQrCodePops(pop[1])) return qrCodePops.push(pop);
      if (filterPops.filterWalletPops(pop[1])) return walletPops.push(pop);
    });

    connections.forEach(({ data, docId }) => profileConnection[docId] = uniqueObjectsInArray(data.map((d) => ({ ...d, customId: Number(getId(12, "1234567890")) })), (item) => item.id || item.email).length);
    dispatch({
      type: CONNECTIONS_INFO_SIDEBAR,
      payload: uniqueObjectsInArray(connections.reduce((acc, item) => ([...acc, ...item.data]), []), (item) => item.id || item.email).length,
    });

    dispatch({
      type: PROFILE_POPS,
      payload: profilePops,
    });

    dispatch({
      type: GET_POPS_FOR_POPLS_SUCCESS,
      payload: [...qrCodePops, ...walletPops, ...poplPops],
    });

    dispatch({
      type: PROFILE_CONNECTIONS,
      payload: profileConnection,
    });
  } catch (error) {
    console.log(error);
    dispatch(snackBarAction({
      message: "server error",
      severity: "error",
      duration: 6000,
      open: true,
    }));
    dispatch(fetchingAction(false, "connectionsSidebar"));
  }
};

export const getLatestConnectionsAction = () => async (dispatch, getState) => {
  try {
    const profiles = getState().profilesReducer.dataProfiles.data;

    const connections = await getCollectionData("people", [...profiles.map(({ id }) => id)]);
    // const result = uniqueObjectsInArray(connections
    // .reduce((acc, item) => ([...acc, ...item.data])
    //   .sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))), []), (item) => item.id)
    // .slice(0, 10)
    // .map((con) => {
    //   const parentProfile = profiles.find((profile) => profile.id === con.profileId);
    //   return { ...con, parentProfileName: parentProfile?.name || "" };
    // });

    const result = uniqueObjectsInArray(connections
      .reduce((acc, item) => ([...acc, ...item.data]), [])
      .filter((con) => !("noPopl" in con))
      .sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))), (item) => item.id)
      .slice(0, 10)
      .map((con) => {
        const parentProfile = profiles.find((profile) => profile.id === con.profileId);
        return { ...con, parentProfileName: parentProfile?.name || "" };
      });

    dispatch({
      type: LATEST_CONNECTIONS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch(fetchingAction(false, "latestConnections"));
  }
};

export const getSubscriptionInfoAction = ({ subscriptionName, maxProfiles }) => ({
  type: SUBSCRIPTION_INFO,
  payload: {
    subscriptionName,
    maxProfiles,
  },
});

export const restricteModeAction = (isRestricted) => ({
  type: SHOW_RESTRICTED_MODE,
  payload: isRestricted,
});

export const fetchingAction = (isFetching, name) => ({
  type: FETCHING_ACTION,
  payload: name ? { isFetching, name } : isFetching,
});

export const handleMainPageScrollAction = (isScroll) => (dispatch) => dispatch({
  type: HANDLE_MAIN_PAGE_SCROLL,
  payload: isScroll,
});

export const increaseStripeAccountNumber = (quantity, cb) => async (dispatch, getState) => {
  const profiles = getState().profilesReducer.dataProfiles.data;
  usageRecordAction(profiles[0].stripeSubscription.split("%")[0], quantity, Math.round(new Date().getTime() / 1000)).then(() => { // after successfully usage record call getting actual usage quantity
    if (profiles && profiles[0]?.stripeCustomer) {
      const getSubscriptionItemId = new FormData();
      getSubscriptionItemId.append("sAction", "EnterpriseGetSubscriptionQuantity");
      getSubscriptionItemId.append("sCustomerId", profiles[0].stripeCustomer);

      axios.post("", getSubscriptionItemId, {
        withCredentials: true,
      })
        .then((res) => {
          const getQuantity = (data) => {
            const subscription = subscriptionConfig.find(({ id }) => id == "10"); // getting priceId from subscription and checking then in stripe response to ensure that it's right subscription
            if (subscription && (data?.lines?.data && data.lines.data[0]?.price?.id === subscription.priceId) && data.lines.data[0]?.quantity) return data.lines.data[0].quantity;
            return null;
          };
          cb();
          dispatch({
            type: SET_METERED_SUB_QUANTITY,
            payload: getQuantity(res.data),
          });
        })
        .catch((err) => console.error(err));
    }
  });
};

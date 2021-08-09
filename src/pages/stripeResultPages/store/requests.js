import axios from "axios";
import { usageRecordRequest, profileIdsRequest } from "../../profiles/store/actions/requests";
import { SET_METERED_SUB_QUANTITY } from "../../../store/actionTypes";
import store from "../../../store";
import { GET_DASHBOARD_PLAN_SUCCESS } from "../../auth/store/actionTypes";

export const setDashboardPlan = (id) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetDashboardPlan");
  bodyFormData.append("ajax", 1);
  bodyFormData.append("iID", id);
  bodyFormData.append("iPlan ", "1");
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const getChildProfiles = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "getChild");
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setUserProRequest = (profileId) => {
  const body = JSON.stringify({
    duration: "lifetime",
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk_MLaAGzmHomNgUdmNWfvlxoqvdMIXi",
    },
    body,
  };
  return fetch(`https://api.revenuecat.com/v1/subscribers/${profileId}/entitlements/pro/promotional`, options);
};

export const setStripeCustomer = async (sessionId, userId, quantity, isNewBilling, errorMessageCallback) => {
  if (isNewBilling) {
    // setting quantity and dashboardPlan here, cause in any case they'll be set just after next page refresh
    store.dispatch({
      type: SET_METERED_SUB_QUANTITY,
      payload: quantity,
    });
    store.dispatch({
      type: GET_DASHBOARD_PLAN_SUCCESS,
      payload: "10",
    });
  }

  const getCustomerData = new FormData();
  getCustomerData.append("sAction", "subCreated");
  getCustomerData.append("sSessionId", sessionId);
  getCustomerData.append("ajax", 1);

  // making call to get customer id from stripe by session id
  const sessionData = await axios.post("", getCustomerData, {
    withCredentials: true,
  });

  // console.log("SUB CREATED", sessionData.data);

  if (!sessionData?.data?.customer) return errorMessageCallback("Error by getting stripe customer id");

  if (isNewBilling) {
    // calling api for getting subscription item id from stripe
    const getSubscriptionItemId = new FormData();
    getSubscriptionItemId.append("sAction", "EnterpriseGetSubscription");
    getSubscriptionItemId.append("sSubscription", sessionData.data.subscription);

    axios.post("", getSubscriptionItemId, {
      withCredentials: true,
    })
      .then((res) => {
      // console.log("SUBSCRIBTION", res);
      // saving subscription item id in db
        const setStripeSubItemId = new FormData();
        setStripeSubItemId.append("sAction", "SetStripeSubscription");
        setStripeSubItemId.append("iID", userId);
        setStripeSubItemId.append("sStripe", `${res.data.data[0].id}%${sessionData.data.subscription}`); // save trial period in milliseconds (two weeks)

        usageRecordRequest(res.data.data[0].id, quantity, Math.ceil(new Date().getTime() / 1000)) // making Math.ceil to avoid case when timestamp  could be less than subscriptionn creation time
          .then(() => {
          // // setting quantity and dashboardPlan here, cause in any case they'll be set just after next page refresh
          // store.dispatch({
          //   type: SET_METERED_SUB_QUANTITY,
          //   payload: quantity,
          // });
          // store.dispatch({
          //   type: GET_DASHBOARD_PLAN_SUCCESS,
          //   payload: "10",
          // });
          });
        axios.post("", setStripeSubItemId, {
          withCredentials: true,
        }).then((result) => console.info("setStripeSubItemId", result)).catch((error) => console.error(error));
      })
      .catch((err) => console.log(err));
  }

  // saving stripe customer in database
  const setStripeCustomerData = new FormData();
  setStripeCustomerData.append("sAction", "SetStripeCustomer");
  setStripeCustomerData.append("iID", userId);
  setStripeCustomerData.append("sStripe", sessionData.data.customer);
  setStripeCustomerData.append("ajax", 1);

  axios.post("", setStripeCustomerData, {
    withCredentials: true,
  });
};

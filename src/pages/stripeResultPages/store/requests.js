import axios from "axios";

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

export const setStripeCustomer = async (sessionId, userId, errorMessageCallback) => {
  const getCustomerData = new FormData();
  getCustomerData.append("sAction", "subCreated");
  getCustomerData.append("sSessionId", sessionId);
  getCustomerData.append("ajax", 1);

  // making call to get customer id from stripe by session id
  const customer = await axios.post("", getCustomerData, {
    withCredentials: true,
  });

  if (!customer?.data?.id) return errorMessageCallback("Error by getting stripe customer id");

  console.log("CUSTOMER ID", customer.data.id);

  const setStripeCustomerData = new FormData();
  setStripeCustomerData.append("sAction", "SetStripeCustomer");
  setStripeCustomerData.append("iID", userId);
  setStripeCustomerData.append("sStripe", customer.data.id);
  setStripeCustomerData.append("ajax", 1);

  axios.post("", setStripeCustomerData, {
    withCredentials: true,
  });
};

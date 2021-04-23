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

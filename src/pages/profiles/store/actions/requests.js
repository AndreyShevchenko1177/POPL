import axios from "axios";

export const getChildrenIdsRequest = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "getChild");
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const profileIdsRequest = async (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "getChild");
  bodyFormData.append("iID", userId);
  const response = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return response;
};

export const getProfileAction = async (id) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetProfileData");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  const { data } = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return { data, id };
};

export const turnProfileRequest = (id, state) => {
  const profileData = {
    id,
    value: state,
  };
  return axios({
    method: "post",
    timeout: 10000,
    url: "",
    baseURL: "/emailAdd",
    data: profileData,
  });
};

export const directRequest = (id, state) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetDirectDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("bIsDirect", state);
  return axios.post("", bodyFormData);
};

export const statusRequest = (id, state) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetActiveProfileDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("iProfileNum", state);
  return axios.post("", bodyFormData);
};

export const addLinkRequest = (value, title, { id, activeProfile }, iconId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "UpdateLinksValuesDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("aLinksIDs[]", iconId);
  bodyFormData.append("aTitles[]", title);
  bodyFormData.append("aValues[]", value);
  bodyFormData.append("aIcons[]", "");
  bodyFormData.append("aProfiles[]", activeProfile);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const deleteLinkRequest = (linkType, linkHash, profileId, linkId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "DeleteLinkDashboard");
  bodyFormData.append("iProfileNum", linkType);
  bodyFormData.append("sHash", linkHash);
  bodyFormData.append("iLinkID", linkId);
  bodyFormData.append("iID", profileId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

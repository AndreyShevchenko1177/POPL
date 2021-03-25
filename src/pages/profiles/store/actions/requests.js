import axios from "axios";

export const getChildrenIdsRequest = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "getChild");
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const profileIds = async (userId) => {
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

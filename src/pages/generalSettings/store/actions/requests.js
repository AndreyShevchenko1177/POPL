import axios from "axios";

export const setCompanyName = (name) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyName");
  bodyFormData.append("sCompanyName", name);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyWebSite = (website) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyWebsite");
  bodyFormData.append("sCompanyWebsite", website);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyColor = (color) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyColor");
  bodyFormData.append("sCompanyColor", color);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

import axios from "axios";
import firebase from "../../../../config/firebase.config";

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

export const getCompanyInfo = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetCompanyInfo");
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyImage = (name) => {
  console.log(name);
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyImage");
  bodyFormData.append("sCompanyProfileImage", name);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyAvatar = async (file) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${file.name}`);
  await fileRef.put(file);
  return downloadFileFromFireBase(file.name);
};

const downloadFileFromFireBase = (fileName, folderName) => {
  try {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${fileName}`).getDownloadURL();
  } catch (error) {
    return error;
  }
};

export const deleteProfileRequest = (profileId, userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "RemoveChild");
  bodyFormData.append("sChild", profileId.toString());
  bodyFormData.append("iID", userId.toString());
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

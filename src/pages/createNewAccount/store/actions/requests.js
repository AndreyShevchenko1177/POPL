import axios from "axios";

export const addNewProfileByEmailRequest = (email, parentId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "CreateAccountWithEmailOnly");
  bodyFormData.append("sEmail", email);
  bodyFormData.append("sParent", parentId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const addNewProfileWithRandomEmailRequest = async (parentId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "CreateAccountWithRandomEmail");
  bodyFormData.append("sParent", parentId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const inviteByEmailRequest = (email, userData, emailId) => {
  const formdata = new FormData();
  formdata.append("ajax", "1");
  formdata.append("sAction", "AddToDashboardEmail");
  formdata.append("sToEmail", email);
  formdata.append("sToName", "name");
  formdata.append("sCompanyName", userData.name);
  formdata.append("iID", userData.id);
  formdata.append("sChild", `[${emailId}]`);
  formdata.append("sSubject", "Hey name, time to go pro :rocket:");
  return axios.post("", formdata);
};

export const getIdFromEmail = async (email) => {
  const formdata = new FormData();
  formdata.append("ajax", "1");
  formdata.append("sAction", "GetIdFromEmail");
  formdata.append("iEmail", email);
  return axios.post("", formdata);
};

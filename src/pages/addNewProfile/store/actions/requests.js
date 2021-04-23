import axios from "axios";

export const addNewProfileByEmailRequest = (email, parentId) => {
  console.log(email);
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "CreateAccountWithEmailOnly");
  bodyFormData.append("sEmail", email);
  bodyFormData.append("sParent ", parentId);
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

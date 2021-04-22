import axios from "axios";

export const addNewProfileByEmailRequest = (email) => {
  console.log(email);
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxCreateAccountWithEmailOnly");
  bodyFormData.append("sEmail", email);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const addNewProfileWithRandomEmailRequest = async () => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxCreateAccountWithRandomEmail");
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

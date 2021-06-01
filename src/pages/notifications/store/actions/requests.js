import axios from "axios";

export const sendNotificationRequest = (data, userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SendNotification");
  bodyFormData.append("sId", userId);
  bodyFormData.append("sTitle", data.title);
  bodyFormData.append("sMessage", data.message);
  return axios.post("", bodyFormData);
};

export const sendShedulerNotificationRequest = (data, userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SendNotification");
  bodyFormData.append("sTime", data.time);
  bodyFormData.append("sId", userId);
  bodyFormData.append("sTitle", data.title);
  bodyFormData.append("sMessage", data.message);
  return axios.post("", bodyFormData);
};
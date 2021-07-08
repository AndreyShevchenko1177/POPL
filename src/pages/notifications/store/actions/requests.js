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

export const sendEmailRequest = (data) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SendEmail");
  bodyFormData.append("sToEmail", "mynamesurnamemyname@gmail.com");
  bodyFormData.append("sToName", `${data.toName}`);
  bodyFormData.append("sFromName", `${data.fromName} ${data.fileType ? "" : "via Popl Enterprise"}`); // for notification by connections
  bodyFormData.append("sSubject", data.title);
  bodyFormData.append("sContent", data.message);
  bodyFormData.append("sPath", data.fileUrl);
  bodyFormData.append("sType", data.fileType);
  bodyFormData.append("sName", data.fileName);
  return axios.post("", bodyFormData);
};

export const sendShedulerEmailRequest = (data) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SendEmail");
  bodyFormData.append("sToEmail", data.email);
  bodyFormData.append("sTime", data.time);
  bodyFormData.append("sToName", `${data.toName}`);
  bodyFormData.append("sFromName", `${data.fromName} ${data.fileType ? "" : "via Popl Enterprise"}`); // for notification by connections
  bodyFormData.append("sSubject", data.title);
  bodyFormData.append("sContent", data.message);
  bodyFormData.append("sPath", data.fileUrl);
  bodyFormData.append("sType", data.fileType);
  bodyFormData.append("sName", data.fileName);
  return axios.post("", bodyFormData);
};

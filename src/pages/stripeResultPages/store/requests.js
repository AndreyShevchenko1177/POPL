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

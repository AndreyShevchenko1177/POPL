import axios from "axios";

export const dashboardPlanRequest = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetDashboardPlan");
  bodyFormData.append("ajax", 1);
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

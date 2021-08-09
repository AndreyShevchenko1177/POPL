import axios from "axios";

export function salesForceOnSuccess(token, userName, userId, connections) {
  let url = "";
  const profileData = {
    name: "Upload tapped",
    payload: {
      name: userName,
      id: userId,
      data: connections,
    },
  };
  return axios({
    baseURL: "/paragon-connections",
    url: "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: profileData,
    withCredentials: true,
  });
}

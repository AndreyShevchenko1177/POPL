import axios from "axios";

const setAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
};

export default setAxios;

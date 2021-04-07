import axios from "axios";

export const popsActionRequest = (id) => {
  const formdata = new FormData();
  formdata.append("sAction", "AjaxGetPops");
  formdata.append("pid", Number(id));
  formdata.append("ajax", 1);

  return axios.post("", formdata, {
    withCredentials: true,
  });
};

export const getAllThreeStats = async (id) => {
  const formdata = new FormData();
  formdata.append("sAction", "GetAllThree");
  formdata.append("iID", id);
  formdata.append("ajax", 1);

  const response = await axios.post("", formdata, {
    withCredentials: true,
  });
  return { id, data: response.data };
};

import axios from "axios";
import { getProfileAction, profileIds } from "../../../profiles/store/actions/requests";
import { popsActionRequest } from "../../../overallAnalytics/store/actions/requests";

export const getPoplsDataById = async (id) => {
  const getPopolsFormData = new FormData();
  getPopolsFormData.append("sAction", "GetPoplsForId");
  getPopolsFormData.append("ajax", 1);
  getPopolsFormData.append("iID", id);

  const response = await axios.post("", getPopolsFormData, {
    withCredentials: true,
  });
  return response;
};

export const addProfileNamesToPopls = async (id) => {
  const popls = await getPoplsDataById(id);
  const profileData = await getProfileAction(id);
  return popls.data.map((popl) => ({ ...popl, profileOwner: profileData.data.name }));
};

export const getPopsForPoplItem = async (id, poplName) => {
  const { data } = await profileIds(id);
  let response;
  if (data) {
    const ids = JSON.parse(data);
    response = await Promise.all([...ids, id].map((id) => popsActionRequest(id)));
  } else {
    response = await Promise.all([id].map((id) => popsActionRequest(id)));
  }

  const result = response.map(({ data }) => data).reduce((sum, cur) => ([...sum, ...cur]), []);
  if (poplName) {
    const matchString = (popValue) => {
      const result = popValue.slice(-14);
      return result && result.length === 14 ? result : null;
    };

    return result.filter((pop) => matchString(pop[1]) === poplName).length;
  }
};

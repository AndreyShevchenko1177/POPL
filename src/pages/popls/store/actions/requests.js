import axios from "axios";
import { getProfileAction } from "../../../profiles/store/actions/requests";

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
  return popls.data.map((popl) => ({ ...popl, profileOwner: profileData.data.name, profileId: id }));
};

export const getPoplsFromProfiles = async ({ id, name }) => {
  const popls = await getPoplsDataById(id);
  return popls.data.map((popl) => ({ ...popl, profileOwner: name, profileId: id }));
};

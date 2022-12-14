import axios from "axios";

export const profileIdsRequest = async (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "getChild");
  bodyFormData.append("iID", userId);
  const response = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return response;
};

export const getProfileAction = async (id) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetProfileData");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  const { data } = await axios.post("", bodyFormData, {
    withCredentials: true,
  });
  return { data, id };
};

export const turnProfileRequest = (id, state) => {
  const profileData = {
    id,
    value: state,
  };
  return axios({
    method: "post",
    timeout: 10000,
    url: "",
    baseURL: "/emailAdd",
    data: profileData,
  });
};

export const makeProfileProRequest = (id, value) => {
  const data = {
    id: id.toString(),
    value,
  };
  return axios({
    method: "post",
    timeout: 10000,
    url: "",
    baseURL: "/make-pro",
    data,
  });
};

export const directRequest = (id, state) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetDirectDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("bIsDirect", state);
  return axios.post("", bodyFormData);
};

export const statusRequest = (id, state) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetActiveProfileDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("iProfileNum", state);
  return axios.post("", bodyFormData);
};

export const addLinkRequest = (value, title, { id, activeProfile }, iconId, icon) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "UpdateLinksValuesDashboard");
  bodyFormData.append("ajax", "1");
  bodyFormData.append("iID", id);
  bodyFormData.append("aLinksIDs[]", iconId);
  bodyFormData.append("aTitles[]", title);
  bodyFormData.append("aValues[]", value);
  bodyFormData.append("aProfiles[]", activeProfile);
  if (icon) bodyFormData.append("aIcons[]", icon);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const editLinkRequest = ({
  linkType, linkId, linkHash, linkValue, linkTitle, profileId,
}, icon) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "UpdateLinkValueDashboard");
  bodyFormData.append("iProfileNum", linkType);
  bodyFormData.append("iLinkID", linkId);
  bodyFormData.append("sHash", linkHash);
  bodyFormData.append("sValue", linkValue);
  bodyFormData.append("sLinkTitle", linkTitle);
  bodyFormData.append("iID", profileId);
  if (icon) bodyFormData.append("sIcon", icon);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const deleteLinkRequest = (linkType, linkHash, profileId, linkId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "DeleteLinkDashboard");
  bodyFormData.append("iProfileNum", linkType);
  bodyFormData.append("sHash", linkHash);
  bodyFormData.append("iLinkID", linkId);
  bodyFormData.append("iID", profileId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const makeProfileSubscriberRequest = (userId) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer sk_MLaAGzmHomNgUdmNWfvlxoqvdMIXi" },
    body: JSON.stringify({ duration: "lifetime" }),
  };

  fetch(`https://api.revenuecat.com/v1/subscribers/${userId}/entitlements/pro/promotional`, options)
    .then((response) => {
      if (response.status === 201) {
        makeProfileProRequest(userId.toString(), "1");
      }
      if (response.status === 404) {
        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Platform": "ios",
            "Content-Type": "application/json",
            Authorization: "Bearer iasbLElmaZpZjsOcAXsBxoaKfvcGLGYV",
          },
        };

        fetch(`https://api.revenuecat.com/v1/subscribers/${userId}`, options)
          .then((response) => {
            if (response.status === 201) {
              makeProfileSubscriberRequest(userId);
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

// DON'T REMOVE THIS. THIS CALL FOR REVENUECAT RECEIPTS FLOW, THAT WE DON'T USING STILL, BUT WILL USE IN FUTURE
// export const revenuecatReceipts = async() => {
// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "X-Platform": "stripe",
//     Authorization: "Bearer iasbLElmaZpZjsOcAXsBxoaKfvcGLGYV",
//   },
//   body: JSON.stringify({
//     product_id: "prod_JSxR7LsvIZrqXl",
//     price: 4.99,
//     currency: "USD",
//     is_restore: "false",
//     app_user_id: "307179",
//     fetch_token: "sub_JSxSU2qWRtIPWI",
//   }),
// };
// fetch("https://api.revenuecat.com/v1/receipts", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
// }

export const setProfileOrderRequest = (userId, child) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "ReorderChild");
  bodyFormData.append("sChild", JSON.stringify(child));
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData);
};

export const setProfileName = (userId, profileState, name) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetName");
  bodyFormData.append("iProfile", profileState);
  bodyFormData.append("iID", userId);
  bodyFormData.append("iName", name);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setProfileBio = (userId, profileState, bio) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetBio");
  bodyFormData.append("iProfile", profileState);
  bodyFormData.append("iID", userId);
  bodyFormData.append("iBio", bio);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setProfileEmail = (userId, email) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetEmail");
  bodyFormData.append("iID", userId);
  bodyFormData.append("sEmail", email);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setProfilePhoto = (userId, profileState, photo) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetPhoto");
  bodyFormData.append("iProfile", profileState);
  bodyFormData.append("sPhoto", photo);
  bodyFormData.append("iID", userId);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const makeProfileNonPro = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "MakeProfileNotPro");
  bodyFormData.append("iID", userId);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const changeLinksOrderRequest = ({
  linksIds, hashes, profileId, profileState,
}) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "UpdateLinksSortingDashboard");
  linksIds.forEach((id) => bodyFormData.append("aPositions[]", id));
  hashes.forEach((hash) => bodyFormData.append("aHashes[]", hash));
  bodyFormData.append("sID", profileId.toString());
  bodyFormData.append("iProfileNum", profileState);
  return axios.post("", bodyFormData);
};

export const usageRecordRequest = async (subItemId, quantity, timestamp) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "SetNumberAccounts");
  bodyFormData.append("sSubscription", subItemId);
  bodyFormData.append("sQuantity", quantity);
  bodyFormData.append("sTimeStamp", timestamp);

  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

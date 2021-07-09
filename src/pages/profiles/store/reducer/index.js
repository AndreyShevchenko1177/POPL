import {
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
  SET_DIRECT_ON_OFF_SUCCESS,
  SET_PROFILE_STATUS_SUCCESS,
  TURN_PROFILE_ON_OFF_SUCCESS,
  EDIT_PROFILE_LINK,
  DELETE_PROFILE_LINK,
  SET_LOCAL_PROFILES_ORDER,
  CLEAR_STATE,
  IS_DATA_FETCHING,
  SET_PROFILE_NAME,
  SET_PROFILE_BIO,
  SET_PROFILE_PHOTO,
  SET_LINK_ORDER,
  SET_LINKS_OBJECT,
  SET_PROFILE_EMAIL,
} from "../actionTypes";

const initialState = {
  dataProfiles: {
    data: null,
    error: null,
  },
  profilesIds: {
    data: null,
    error: null,
  },
  addLink: {
    data: null,
    error: null,
    isFetching: false,
  },
  deleteLink: {
    data: null,
    error: null,
    isFetching: false,
  },
  editLink: {
    data: null,
    error: null,
    isFetching: false,
  },
  setProfileName: {
    data: null,
    error: null,
    isFetching: false,
  },
  setProfileBio: {
    data: null,
    error: null,
    isFetching: false,
  },
  setProfilePhoto: {
    data: null,
    error: null,
    isFetching: false,
  },
  setProfileEmail: {
    data: null,
    error: null,
    isFetching: false,
  },
  setProfilesSettings: {
    isFetching: false,
  },
  setLinkOrder: {
    data: {},
  },
  profileLinks: null,
  isFetching: null,
};

export default function profilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  case GET_DATA_PROFILES_SUCCESS: {
    const profileLinks = {};
    const profiles = payload.map((profile) => {
      // setting links for all profiles
      profileLinks[profile.customId] = {
        1: profile.social,
        2: profile.business,
      };
      if (!profile.name) {
        return {
          ...profile,
          name: profile.nameBusiness || profile.url,
        };
      }
      return profile;
    });
    return {
      ...state,
      dataProfiles: {
        data: profiles,
        error: null,
      },
      isFetching: false,
      profileLinks,
    };
  }
  case GET_DATA_PROFILES_FAIL: {
    return {
      ...state,
      dataProfiles: {
        data: null,
        error: payload,
      },
      isFetching: false,
    };
  }
  case ADD_LINK_SUCCESS: {
    const profileLinks = {};
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: state.dataProfiles.data.map((profile) => {
          const updatedProfile = payload.profiles.find((item) => item.id == profile.id);
          // console.log(profile.id, updatedProfile, payload.profiles);
          if (updatedProfile) {
            profileLinks[profile.customId] = {
              1: updatedProfile.social,
              2: updatedProfile.business,
            };
            return { ...updatedProfile, customId: profile.customId }; // returning updated profile and setting previous custom id for draggable component
          }
          return profile;
        }),
      },
      addLink: {
        data: payload.data,
        error: null,
        isFetching: false,
      },
      profileLinks: { // updating profile links
        ...state.profileLinks,
        ...profileLinks,
      },
    };
  }
  case ADD_LINK_FAIL: {
    return {
      ...state,
      addLink: {
        data: payload,
        error,
        isFetching: false,
      },
    };
  }
  case EDIT_PROFILE_LINK: {
    const profileLinks = {};
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: state.dataProfiles.data.map((profile) => {
          const updatedProfile = payload.find((item) => item.id == profile.id);
          // console.log(profile.id, updatedProfile, payload.profiles);
          if (updatedProfile) {
            profileLinks[profile.customId] = {
              1: updatedProfile.social,
              2: updatedProfile.business,
            };
            return { ...updatedProfile, customId: profile.customId }; // returning updated profile and setting previous custom id for draggable component
          }
          return profile;
        }),
      },
      editLink: {
        data: payload,
        error: null,
        isFetching: false,
      },
      profileLinks: { // updating profile links
        ...state.profileLinks,
        ...profileLinks,
      },
    };
  }
  case DELETE_PROFILE_LINK: {
    const profileLinks = {};
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: state.dataProfiles.data.map((profile) => {
          const updatedProfile = payload.find((item) => item.id == profile.id);
          // console.log(profile.id, updatedProfile, payload.profiles);
          if (updatedProfile) {
            profileLinks[profile.customId] = {
              1: updatedProfile.social,
              2: updatedProfile.business,
            };
            return { ...updatedProfile, customId: profile.customId }; // returning updated profile and setting previous custom id for draggable component
          }
          return profile;
        }),
      },
      deleteLink: {
        data: payload,
        error: null,
        isFetching: false,
      },
      profileLinks: { // updating profile links
        ...state.profileLinks,
        ...profileLinks,
      },
    };
  }
  case SET_DIRECT_ON_OFF_SUCCESS: {
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: state.dataProfiles.data.map((profile) => {
          let transformedProfile = { ...profile };
          payload.profileIds.forEach((profileId) => {
            if (profileId == profile.id) {
              transformedProfile = { ...profile, direct: payload.state };
            }
          });
          return transformedProfile;
        }),
      },
      setProfilesSettings: {
        isFetching: false,
      },
      isFetching: false,
    };
  }
  case SET_PROFILE_STATUS_SUCCESS: {
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: state.dataProfiles.data.map((profile) => {
          let transformedProfile = { ...profile };
          payload.profileIds.forEach((profileId) => {
            if (profileId == profile.id) {
              transformedProfile = { ...profile, activeProfile: payload.state };
            }
          });
          return transformedProfile;
        }),
      },
      setProfilesSettings: {
        isFetching: false,
      },
      isFetching: false,
    };
  }
  case TURN_PROFILE_ON_OFF_SUCCESS: {
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: state.dataProfiles.data.map((profile) => {
          let transformedProfile = { ...profile };
          payload.profileIds.forEach((profileId) => {
            if (profileId == profile.id) {
              transformedProfile = { ...profile, profileOff: payload.state === "true" ? "0" : "1" };
            }
          });
          return transformedProfile;
        }),
      },
      setProfilesSettings: {
        isFetching: false,
      },
      isFetching: false,
    };
  }
  case SET_LOCAL_PROFILES_ORDER: {
    return {
      ...state,
      dataProfiles: {
        data: payload,
        error: null,
      },
    };
  }
  case IS_DATA_FETCHING: {
    if (payload.name) {
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name],
          isFetching: payload.isFetching,
        },
      };
    }
    return {
      ...state,
      isFetching: payload,
    };
  }
  case SET_PROFILE_BIO: {
    return {
      ...state,
      setProfileBio: {
        data: true,
        error: null,
        isFetching: false,
      },
      dataProfiles: {
        data: state.dataProfiles.data.map((profile) => {
          if (profile.id == payload.profileId) return { ...profile, [payload.profileState == "1" ? "bio" : "bioBusiness"]: payload.bio };
          return profile;
        }),
        error: null,
      },
      isFetching: false,
    };
  }
  case SET_PROFILE_EMAIL: {
    return {
      ...state,
      setProfileEmail: {
        data: true,
        error: null,
        isFetching: false,
      },
      dataProfiles: {
        data: state.dataProfiles.data.map((profile) => {
          if (profile.id == payload.profileId) return { ...profile, email: payload.email };
          return profile;
        }),
        error: null,
      },
      isFetching: false,
    };
  }
  case SET_PROFILE_NAME: {
    console.log(payload.updatedProfile);
    return {
      ...state,
      setProfileName: {
        data: true,
        error: null,
        isFetching: false,
      },
      dataProfiles: {
        data: state.dataProfiles.data.map((profile) => {
          if (profile.id == payload.profileId) {
            return {
              ...profile,
              name: payload.updatedProfile.name || payload.updatedProfile.nameBusiness || payload.updatedProfile.url,
              nameBusiness: payload.updatedProfile.nameBusiness || payload.updatedProfile.name || payload.updatedProfile.url,
            };
          }
          return profile;
        }),
        error: null,
      },
      isFetching: false,
    };
  }
  case SET_PROFILE_PHOTO: {
    return {
      ...state,
      setProfilePhoto: {
        data: true,
        error: null,
        isFetching: true,
      },
      dataProfiles: {
        data: state.dataProfiles.data.map((profile) => {
          if (profile.id == payload.profileId) return { ...profile, [payload.profileState == "2" ? "imageBusiness" : "image"]: payload.photo };
          return profile;
        }),
        error: null,
      },
      isFetching: false,
    };
  }
  case SET_LINK_ORDER: {
    return {
      ...state,
      setLinkOrder: {
        data: { ...state.setLinkOrder.data, ...payload },
      },
    };
  }
  case SET_LINKS_OBJECT: {
    return {
      ...state,
      profileLinks: payload.data,
      dataProfiles: {
        data: state.dataProfiles.data.map((profile) => {
          if (payload.profileId === profile.customId) {
            return {
              ...profile,
              social: payload.data[profile.customId]["1"],
              business: payload.data[profile.customId]["2"],
            };
          }
          return profile;
        }),
        error: null,
      },
    };
  }
  case CLEAR_STATE: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  default:
    return state;
  }
}

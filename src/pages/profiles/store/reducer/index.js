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
  },
  deleteLink: {
    data: null,
    error: null,
  },
  editLink: {
    data: null,
    error: null,
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
  setProfilesSettings: {
    isFetching: false,
  },
  isFetching: false,
};

export default function profilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  case GET_DATA_PROFILES_SUCCESS: {
    const profiles = payload.map((profile) => {
      if (!profile.name) {
        return {
          ...profile,
          name: profile.url,
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
    return {
      ...state,
      addLink: {
        data: payload,
        error: null,
      },
      isFetching: false,
    };
  }
  case ADD_LINK_FAIL: {
    return {
      ...state,
      addLink: {
        data: payload,
        error,
      },
      isFetching: false,
    };
  }
  case EDIT_PROFILE_LINK: {
    return {
      ...state,
      editLink: {
        data: payload,
        error: null,
      },
    };
  }
  case DELETE_PROFILE_LINK: {
    return {
      ...state,
      deleteLink: {
        data: payload,
        error: null,
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
  case SET_PROFILE_NAME: {
    return {
      ...state,
      setProfileName: {
        data: true,
        error: null,
        isFetching: false,
      },
      dataProfiles: {
        data: state.dataProfiles.data.map((profile) => {
          if (profile.id == payload.profileId) return { ...profile, name: payload.name };
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
          if (profile.id == payload.profileId) return { ...profile, image: payload.photo };
          return profile;
        }),
        error: null,
      },
      isFetching: false,
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

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
  isFetching: false,
};

export default function profilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  case GET_DATA_PROFILES_SUCCESS: {
    return {
      ...state,
      dataProfiles: {
        data: payload,
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
    return {
      ...state,
      isFetching: payload,
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

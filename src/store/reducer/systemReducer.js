import {
  PROFILE_DATA, ALERT,
  PROFILE_INFO_FOR_SIDE_BAR,
  PROFILE_COUNT_TIER_LEVEL,
  SUBSCRIPTION_INFO,
  FETCHING_ACTION,
  UPDATE_CONNECTIONS,
  SHOW_RESTRICTED_MODE,
  HIDE_RESTRICTED_MODE,
  PROFILE_INFO_FOR_MAIN_PAGE,
  UPDATE_SIDE_BAR_DATA_STATUS,
  HANDLE_MAIN_PAGE_SCROLL,
} from "../actionTypes";

const initialState = {
  profileData: {},
  alert: {
    message: "",
    duration: 120000,
    severity: "",
    open: false,
  },
  profileInfoSideBar: {
    result: {},
    profileConnection: {},
    poplsConnection: {},
    popsConnection: {},
    isFetching: false,
  },
  tierLevelInfo: {
    count: null,
    subscriptionName: null,
    maxProfiles: null,
  },
  profilesInfoMainPage: null,
  isRestrictedMode: false,
  isHiderestrictedMode: false,
  isFetching: false,
  isMainPageScroll: true,
};

export default function systemReducer(state = initialState, { type, payload }) {
  switch (type) {
  case PROFILE_DATA: {
    return {
      ...state,
      profileData: payload,
      isFetching: false,
    };
  }
  case ALERT: {
    return {
      ...state,
      alert: payload,
    };
  }
  case PROFILE_INFO_FOR_SIDE_BAR: {
    return {
      ...state,
      profileInfoSideBar: payload,
      isFetching: false,
    };
  }
  case PROFILE_COUNT_TIER_LEVEL: {
    return {
      ...state,
      tierLevelInfo: {
        ...state.tierLevelInfo,
        count: payload,
      },
      isFetching: false,
    };
  }
  case SUBSCRIPTION_INFO: {
    return {
      ...state,
      tierLevelInfo: {
        ...state.tierLevelInfo,
        ...payload,
      },
      isFetching: false,
    };
  }
  case UPDATE_CONNECTIONS: {
    return {
      ...state,
      profileInfoSideBar: {
        ...payload,
        isFetching: false,
      },
      isFetching: false,
    };
  }
  case SHOW_RESTRICTED_MODE: {
    return {
      ...state,
      isRestrictedMode: payload,
    };
  }
  case FETCHING_ACTION: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  case HIDE_RESTRICTED_MODE: {
    return {
      ...state,
      isHiderestrictedMode: true,
    };
  }
  case PROFILE_INFO_FOR_MAIN_PAGE: {
    return {
      ...state,
      profilesInfoMainPage: payload,
    };
  }
  case UPDATE_SIDE_BAR_DATA_STATUS: {
    return {
      ...state,
      profileInfoSideBar: {
        ...state.profileInfoSideBar,
        isFetching: true,
      },
    };
  }
  case HANDLE_MAIN_PAGE_SCROLL: {
    console.log(payload);
    return {
      ...state,
      isMainPageScroll: payload,
    };
  }
  default:
    return state;
  }
}

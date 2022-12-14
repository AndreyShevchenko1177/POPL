import {
  PROFILE_DATA, ALERT,
  PROFILE_COUNT_TIER_LEVEL,
  PROFILE_POPLS,
  PROFILE_POPS,
  PROFILE_CONNECTIONS,
  SUBSCRIPTION_INFO,
  FETCHING_ACTION,
  SHOW_RESTRICTED_MODE,
  PROFILE_INFO_FOR_MAIN_PAGE,
  HANDLE_MAIN_PAGE_SCROLL,
  PROFILES_INFO_SIDEBAR,
  POPLS_INFO_SIDEBAR,
  CONNECTIONS_INFO_SIDEBAR,
  LATEST_CONNECTIONS,
  SET_METERED_SUB_QUANTITY,
} from "../actionTypes";

const initialState = {
  profileData: {},
  alert: {
    message: "",
    duration: 120000,
    severity: "",
    open: false,
  },
  profilePopls: {
    data: {},
    error: null,
    isFetching: false,
  },
  profilePops: {
    data: {},
    error: null,
    isFetching: false,
  },
  profileConnections: {
    data: {},
    error: null,
    isFetching: false,
  },
  tierLevelInfo: {
    count: null,
    subscriptionName: null,
    maxProfiles: null,
  },
  profilesSidebar: {
    data: null,
    error: null,
    isFetching: true,
  },
  poplsSidebar: {
    data: null,
    error: null,
    isFetching: true,
  },
  connectionsSidebar: {
    data: null,
    error: null,
    isFetching: true,
  },
  latestConnections: {
    data: null,
    error: null,
    isFetching: true,
  },
  profilesInfoMainPage: null,
  isRestrictedMode: false,
  isFetching: false,
  isMainPageScroll: true,
  setMeteredSubQuantity: null,
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
  case PROFILE_POPLS: {
    return {
      ...state,
      profilePopls: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case PROFILE_POPS: {
    return {
      ...state,
      profilePops: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case PROFILE_CONNECTIONS: {
    return {
      ...state,
      profileConnections: {
        data: payload,
        error: null,
        isFetching: false,
      },
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
  case SHOW_RESTRICTED_MODE: {
    return {
      ...state,
      isRestrictedMode: payload,
    };
  }
  case FETCHING_ACTION: {
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
  case PROFILE_INFO_FOR_MAIN_PAGE: {
    return {
      ...state,
      profilesInfoMainPage: payload,
    };
  }
  case PROFILES_INFO_SIDEBAR: {
    return {
      ...state,
      profilesSidebar: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case POPLS_INFO_SIDEBAR: {
    return {
      ...state,
      poplsSidebar: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case CONNECTIONS_INFO_SIDEBAR: {
    return {
      ...state,
      connectionsSidebar: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case LATEST_CONNECTIONS: {
    return {
      ...state,
      latestConnections: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case HANDLE_MAIN_PAGE_SCROLL: {
    return {
      ...state,
      isMainPageScroll: payload,
    };
  }
  case SET_METERED_SUB_QUANTITY: {
    return {
      ...state,
      setMeteredSubQuantity: payload,
    };
  }
  default:
    return state;
  }
}

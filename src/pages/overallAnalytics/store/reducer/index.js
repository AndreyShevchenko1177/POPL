import {
  GET_POPS_SUCCESS,
  GET_POPS_SUCCESS_NEW,
  GET_POPS_FAIL,
  IS_DATA_FETCHING,
  DASHBOARD_POPS_DATA,
  CLEAN,
  CLEAN_BY_NAME,
  GET_VIEWS_BOTTOM,
  GET_LINK_TAPS_BOTTOM,
  GET_VIEWS_TOP,
  POPS_COUNT_TOP,
  TOTAL_POPLS,
  TOP_POPPED_POPLS,
  CHECK_BOX,
  CLEAR_CHECKBOXES,
  CACHE_LINK_TAPS_WIDGET,
  CACHE_TOP_VIEWED_PROFILES_WIDGET,
  CACHE_MOST_ACTIVE_DEVICES_WIDGET,
  CLEAR_CACHE_GRAPHS,

} from "../actionTypes";

const initialState = {
  allPops: {
    data: null,
    error: null,
  },
  allPopsNew: {
    data: null,
    error: null,
  },
  dashboardPops: null,
  totalPopls: {
    data: null,
    error: null,
    isFetching: true,
  },
  popsCountTop: {
    data: null,
    error: null,
    isFetching: true,
  },
  viewsTop: {
    data: null,
    error: null,
    isFetching: true,
  },
  topPoppedPopls: {
    data: null,
    error: null,
    isFetching: true,
  },
  linkTapsBottom: {
    data: null,
    error: null,
    isFetching: true,
  },
  viewsBottom: {
    data: null,
    error: null,
    isFetching: true,
  },
  checkBoxData: {
    profiles: {},
    devices: {},
  },
  topTappedLinksCache: null,
  topViewedAccountsCache: null,
  mostActiveDevicesCache: null,
  isFetching: false,
};

export default function realTimeAnalytics(
  state = initialState,
  { type, payload, name },
) {
  switch (type) {
  case GET_POPS_SUCCESS: {
    return {
      ...state,
      allPops: {
        error: null,
        data: payload,
      },
      isFetching: false,
    };
  }
  case GET_POPS_SUCCESS_NEW: {
    return {
      ...state,
      allPopsNew: {
        error: null,
        data: payload,
      },
      isFetching: false,
    };
  }
  case GET_POPS_FAIL: {
    return {
      ...state,
      allPops: {
        data: [],
        error: payload,
      },
      isFetching: false,
    };
  }
  case DASHBOARD_POPS_DATA: {
    return {
      ...state,
      dashboardPops: payload,
    };
  }
  case IS_DATA_FETCHING: {
    if (payload.name && typeof payload.name !== "object") {
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name],
          isFetching: payload.isFetching,
        },
      };
    }
    if (payload.name && typeof payload.name === "object") {
      const newState = { ...state };
      Object.keys(state).forEach((key) => {
        payload.name.forEach((name) => {
          if (name === key) {
            newState[name] = {
              ...state[newState.name],
              isFetching: payload.isFetching,
            };
          }
        });
      });
      return newState;
    }
    return {
      ...state,
      isFetching: payload,
    };
  }
  case GET_LINK_TAPS_BOTTOM: {
    return {
      ...state,
      linkTapsBottom: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case GET_VIEWS_BOTTOM: {
    return {
      ...state,
      viewsBottom: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case GET_VIEWS_TOP: {
    return {
      ...state,
      viewsTop: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case POPS_COUNT_TOP: {
    return {
      ...state,
      popsCountTop: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case TOP_POPPED_POPLS: {
    return {
      ...state,
      topPoppedPopls: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case TOTAL_POPLS: {
    return {
      ...state,
      totalPopls: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case CACHE_LINK_TAPS_WIDGET: {
    return {
      ...state,
      topTappedLinksCache: payload,
    };
  }
  case CACHE_TOP_VIEWED_PROFILES_WIDGET: {
    return {
      ...state,
      topViewedAccountsCache: payload,
    };
  }
  case CACHE_MOST_ACTIVE_DEVICES_WIDGET: {
    return {
      ...state,
      mostActiveDevicesCache: payload,
    };
  }
  case CLEAN: {
    return {
      ...initialState,
      checkBoxData: state.checkBoxData,
    };
  }
  case CLEAN_BY_NAME: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  case CHECK_BOX: {
    return {
      ...state,
      checkBoxData: {
        ...state.checkBoxData,
        [name]: {
          ...state.checkBoxData[name],
          [payload.id]: payload.checked,
        },
      },
    };
  }
  case CLEAR_CHECKBOXES: {
    return {
      ...state,
      checkBoxData: initialState.checkBoxData,
    };
  }
  case CLEAR_CACHE_GRAPHS: {
    return {
      ...state,
      topTappedLinksCache: null,
      topViewedAccountsCache: null,
      mostActiveDevicesCache: null,
    };
  }
  default:
    return state;
  }
}

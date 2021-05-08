import {
  GET_POPS_SUCCESS,
  GET_POPS_FAIL,
  GET_TOP_STATISTICS_SUCCESS,
  GET_TOP_STATISTICS_FAIL, IS_DATA_FETCHING,
  DASHBOARD_POPS_DATA, CLEAN,
  INDIVIDUAL_POPS_COUNT, CLEAN_BY_NAME,
  GET_VIEWS,
  GET_LINK_TAPS,
} from "../actionTypes";

const initialState = {
  allPops: {
    data: null,
    error: null,
  },
  dashboardPops: null,
  topStatisticsData: {
    data: null,
    error: null,
    isFetched: true,
  },
  linkTaps: {
    data: null,
    error: null,
    isFetching: false,
  },
  views: {
    data: null,
    error: null,
    isFetching: false,
  },
  isFetching: false,
};

export default function realTimeAnalytics(
  state = initialState,
  { type, payload },
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
  case GET_TOP_STATISTICS_SUCCESS: {
    return {
      ...state,
      topStatisticsData: {
        error: null,
        data: payload,
        isFetched: false,
      },
      isFetching: false,
    };
  }
  case GET_TOP_STATISTICS_FAIL: {
    return {
      ...state,
      topStatisticsData: {
        data: null,
        error: payload,
        isFetched: false,
      },
      isFetching: false,
    };
  }
  case INDIVIDUAL_POPS_COUNT: {
    return {
      ...state,
      topStatisticsData: {
        data: {
          totalProfiles: null,
          linkTaps: null,
          totalPopls: null,
          popsCount: payload,
        },
        error: null,
        isFetched: false,
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
  case GET_LINK_TAPS: {
    return {
      ...state,
      linkTaps: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case GET_VIEWS: {
    return {
      ...state,
      views: {
        data: payload,
        error: null,
        isFetching: false,
      },
    };
  }
  case CLEAN: {
    return initialState;
  }
  case CLEAN_BY_NAME: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  default:
    return state;
  }
}

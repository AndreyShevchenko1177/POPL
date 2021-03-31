import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_TOP_STATISTICS_SUCCESS, GET_TOP_STATISTICS_FAIL, IS_DATA_FETCHING, CLEAN, INDIVIDUAL_POPS_COUNT,
} from "../actionTypes";

const initialState = {
  allPops: {
    data: null,
    error: null,
  },
  topStatisticsData: {
    data: null,
    error: null,
    isFetched: true,
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
  case IS_DATA_FETCHING: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  case CLEAN: {
    return initialState;
  }
  default:
    return state;
  }
}

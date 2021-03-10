import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_TOP_STATISTICS_SUCCESS, GET_TOP_STATISTICS_FAIL,
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
      };
    }
    case GET_POPS_FAIL: {
      return {
        ...state,
        allPops: {
          data: [],
          error: payload,
        },
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
      };
    }
    case GET_TOP_STATISTICS_FAIL: {
      return {
        ...state,
        linkTaps: {
          data: [],
          error: payload,
          isFetched: false,
        },
      };
    }
    default:
      return state;
  }
}

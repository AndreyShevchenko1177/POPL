import {
  GET_POPS_SUCCESS, GET_POPS_FAIL, GET_LINKTAPS_SUCCESS, GET_LINKTAPS_FAIL,
} from "../actionTypes";

const initialState = {
  allPops: {
    data: null,
    error: null,
  },
  linkTaps: {
    data: null,
    error: null,
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
    case GET_LINKTAPS_SUCCESS: {
      return {
        ...state,
        linkTaps: {
          error: null,
          data: payload,
        },
      };
    }
    case GET_LINKTAPS_FAIL: {
      return {
        ...state,
        linkTaps: {
          data: [],
          error: payload,
        },
      };
    }
    default:
      return state;
  }
}

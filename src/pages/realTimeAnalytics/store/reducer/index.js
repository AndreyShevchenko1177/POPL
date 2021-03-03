import { GET_POPS_SUCCESS, GET_POPS_FAIL } from "../actionTypes";

const initialState = {
  allPops: {
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
    default:
      return state;
  }
}

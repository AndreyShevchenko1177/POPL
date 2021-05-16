import {
  GET_POPS_DASHBOARD_SUCCESS,
  IS_DATA_FETCHING,
} from "../actionTypes";

const initialState = {
  allPops: {
    data: null,
    error: null,
  },
  isFetching: false,
};

export default function dashboardReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
  case GET_POPS_DASHBOARD_SUCCESS: {
    return {
      ...state,
      allPops: {
        data: payload,
        error: null,
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
  default:
    return state;
  }
}

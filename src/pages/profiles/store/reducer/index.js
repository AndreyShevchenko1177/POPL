import {
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
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

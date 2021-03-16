import {
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
  CLEAR_STATE,
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
    };
  }
  case GET_DATA_PROFILES_FAIL: {
    return {
      ...state,
      dataProfiles: {
        data: null,
        error: payload,
      },
    };
  }
  case ADD_LINK_SUCCESS: {
    return {
      ...state,
      addLink: {
        data: payload,
        error: null,
      },
    };
  }
  case ADD_LINK_FAIL: {
    return {
      ...state,
      addLink: {
        data: payload,
        error,
      },
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

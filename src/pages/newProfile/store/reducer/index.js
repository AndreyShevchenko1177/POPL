import {
  ADD_CHILD_PROFILE_SUCCESS,
  ADD_CHILD_PROFILE_FAIL,
  SIGN_IN_CHILD_SUCCESS,
  SIGN_IN_CHILD_FAIL,
  CLEAR_STATE,
} from "../actionTypes";

const initialState = {
  addChildProfile: {
    data: null,
    error: null,
  },
  childSignIn: {
    data: null,
    error: null,
  },
};

export default function addProfilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  case ADD_CHILD_PROFILE_SUCCESS: {
    return {
      ...state,
      addChildProfile: {
        data: payload,
        error: null,
      },
    };
  }
  case ADD_CHILD_PROFILE_FAIL: {
    return {
      ...state,
      addChildProfile: {
        data: null,
        error: payload,
      },
    };
  }
  case SIGN_IN_CHILD_SUCCESS: {
    return {
      ...state,
      childSignIn: {
        data: payload,
        error: null,
      },
    };
  }
  case SIGN_IN_CHILD_FAIL: {
    return {
      ...state,
      childSignIn: {
        data: null,
        error: payload,
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

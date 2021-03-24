import {
  ADD_CHILD_PROFILE_SUCCESS,
  ADD_CHILD_PROFILE_FAIL,
  SIGN_IN_CHILD_SUCCESS,
  SIGN_IN_CHILD_FAIL,
  INVITE_BY_EMAIL_SUCCESS,
  INVITE_BY_EMAIL_FAIL,
  IS_DATA_FETCHING,
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
  inviteByEmail: {
    success: false,
    error: null,
  },
  isFetching: false,
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
  case INVITE_BY_EMAIL_SUCCESS: {
    return {
      ...state,
      inviteByEmail: {
        success: true,
        error: null,
      },
    };
  }
  case INVITE_BY_EMAIL_FAIL: {
    return {
      ...state,
      inviteByEmail: {
        success: false,
        error: payload,
      },
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

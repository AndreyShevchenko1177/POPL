import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from "../actionTypes";

const initialState = {
  "sign-in": {
    data: null,
    error: null,
  },
  "sign-up": {
    success: null,
    fail: null,
  },
};

export default function AuthReducer(
  state = initialState,
  { type, payload, name }
) {
  switch (type) {
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        [name]: {
          ...state.name,
          data: payload,
        },
      };
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        [name]: {
          ...state[name],
          data: null,
          error: payload,
        },
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        [name]: {
          ...state.name,
          data: payload,
        },
      };
    }
    case SIGN_UP_FAIL: {
      return {
        ...state,
        [name]: {
          ...state[name],
          data: null,
          error: payload,
        },
      };
    }
    default:
      return state;
  }
}

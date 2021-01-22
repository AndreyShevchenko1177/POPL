import { SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_UP_FAIL } from "../actionTypes";

const initialState = {
  signIn: {
    data: null,
    error: null,
  },
  signUp: {
    error: null,
  },
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          data: payload,
        },
      };
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        signIn: {
          ...state.signIn,
          data: null,
          error: payload,
        },
      };
    }
    case SIGN_UP_FAIL: {
      return {
        ...state,
        signUp: {
          ...state.signUp,
          error: payload,
        },
      };
    }
    default:
      return state;
  }
}

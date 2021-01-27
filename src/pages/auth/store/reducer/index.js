import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  LOGOUT,
} from "../actionTypes";
import { deleteCookies, existingCookies } from "../../../../utils/cookie";

const initialState = {
  signIn: {
    data: null,
    error: null,
  },
  signUp: {
    data: false,
    error: null,
  },
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS: {
      const { l_i, l_t, ...data } = payload;
      localStorage.setItem("profileData", JSON.stringify(data));
      return {
        ...state,
        signIn: {
          ...state.signIn,
          data,
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
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUp: {
          ...state.signUp,
          data: payload,
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
    case LOGOUT: {
      localStorage.removeItem("profileData");
      existingCookies.forEach((name) => deleteCookies(name));
      return initialState;
    }
    default:
      return state;
  }
}

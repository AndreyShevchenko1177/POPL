import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  GET_DASHBOARD_PLAN_SUCCESS,
  GET_DASHBOARD_PLAN_FAIL,
  LOGOUT,
  CLEAN_STATE,
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
  dashboardPlan: {
    data: null,
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
        data,
        error: null,
      },
    };
  }
  case SIGN_IN_FAIL: {
    return {
      ...state,
      signIn: {
        data: null,
        error: payload,
      },
    };
  }
  case SIGN_UP_SUCCESS: {
    return {
      ...state,
      signUp: {
        data: payload,
        error: null,
      },
    };
  }
  case SIGN_UP_FAIL: {
    return {
      ...state,
      signUp: {
        data: null,
        error: payload,
      },
    };
  }
  case GET_DASHBOARD_PLAN_SUCCESS: {
    return {
      ...state,
      dashboardPlan: {
        data: payload,
        error: null,
      },
    };
  }
  case GET_DASHBOARD_PLAN_FAIL: {
    return {
      ...state,
      dashboardPlan: {
        data: null,
        error: payload,
      },
    };
  }
  case LOGOUT: {
    localStorage.removeItem("profileData");
    existingCookies.forEach((name) => deleteCookies(name));
    return initialState;
  }
  case CLEAN_STATE: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  default:
    return state;
  }
}

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  GET_DASHBOARD_PLAN_SUCCESS,
  GET_DASHBOARD_PLAN_FAIL,
  LOGOUT,
  CLEAN_STATE,
  IS_SIGN_ACTION,
  IS_FETCHING,
} from "../actionTypes";
import { deleteCookies, existingCookies } from "../../../../utils/cookie";

const initialState = {
  signIn: {
    data: null,
    error: null,
  },
  signUp: {
    data: null,
    error: null,
  },
  dashboardPlan: {
    data: null,
    error: null,
  },
  isFetching: false,
  isSign: true, // isSign key used for indicating that this action called after sign in not after page reload
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
      isFetching: false,
    };
  }
  case SIGN_IN_FAIL: {
    return {
      ...state,
      signIn: {
        data: null,
        error: payload,
      },
      isFetching: false,
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
      isFetching: false,
    };
  }
  case GET_DASHBOARD_PLAN_SUCCESS: {
    return {
      ...state,
      dashboardPlan: {
        data: payload || 0,
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
  case IS_SIGN_ACTION: {
    return {
      ...state,
      isSign: payload,
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
  case IS_FETCHING: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  default:
    return state;
  }
}

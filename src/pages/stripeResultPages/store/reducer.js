import { SET_USER_PRO_SUCCESS, SET_USER_PRO_FAIL } from "./actionTypes";

const initialState = {
  userPro: {
    data: null,
    error: null,
  },
};

export default function stripeResult(state = initialState, { type, payload, error }) {
  switch (type) {
    case SET_USER_PRO_SUCCESS:
      return {
        ...state,
        userPro: {
          data: payload,
          error: null,
        },
      };
    case SET_USER_PRO_FAIL:
      return {
        ...state,
        userPro: {
          data: null,
          error,
        },
      };
    default:
      return state;
  }
}

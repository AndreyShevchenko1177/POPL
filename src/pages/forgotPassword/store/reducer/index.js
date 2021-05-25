import { SEND_CODE, SET_NEW_PASSWORD, CLEAR } from "../actionTypes";

const initialState = {
  code: {
    success: "",
    error: "",
  },
  resetPassword: {
    success: "",
    error: "",
  },
};

const forgotPasswordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case SEND_CODE: {
    return {
      ...state,
      code: {
        success: payload,
        error: "",
      },
    };
  }
  case SET_NEW_PASSWORD: {
    return {
      ...state,
      resetPassword: {
        success: payload,
        error: "",
      },
      code: {
        success: "",
        error: "",
      },
    };
  }
  case CLEAR: {
    return initialState;
  }
  default: {
    return state;
  }
  }
};

export default forgotPasswordReducer;

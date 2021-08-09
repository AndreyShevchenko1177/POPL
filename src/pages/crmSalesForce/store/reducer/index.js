import {
  SAVE_JWT_TOKEN,
} from "../actionTypes";

const initialState = {
  jwtToken: null,
};

export default function salesForceReducer(state = initialState, { type, payload }) {
  switch (type) {
  case SAVE_JWT_TOKEN: {
    return {
      ...state,
      jwtToken: payload,
    };
  }
  default:
    return state;
  }
}

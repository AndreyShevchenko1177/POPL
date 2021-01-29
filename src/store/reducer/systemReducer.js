import { PROFILE_DATA, ALERT } from "../actionTypes";

const initialState = {
  profileData: {},
  alert: {
    message: "",
    duration: 6000,
    severity: "",
    open: false,
  },
};

export default function systemReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PROFILE_DATA: {
      return {
        ...state,
        profileData: payload,
      };
    }
    case ALERT: {
      return {
        ...state,
        alert: payload,
      };
    }
    default:
      return state;
  }
}

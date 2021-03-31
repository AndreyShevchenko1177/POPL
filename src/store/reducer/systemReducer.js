import { PROFILE_DATA, ALERT, PROFILE_INFO_FOR_SIDE_BAR } from "../actionTypes";

const initialState = {
  profileData: {},
  alert: {
    message: "",
    duration: 6000,
    severity: "",
    open: false,
  },
  profileInfoSideBar: {
    result: {},
    profileConnection: {},
    poplsConnection: {},
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
  case PROFILE_INFO_FOR_SIDE_BAR: {
    return {
      ...state,
      profileInfoSideBar: payload,
    };
  }
  default:
    return state;
  }
}

import {
  PROFILE_DATA, ALERT, PROFILE_INFO_FOR_SIDE_BAR, PROFILE_COUNT_TIER_LEVEL, SUBSCRIPTION_INFO,
} from "../actionTypes";

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
  tierLevelInfo: {
    count: null,
    subscriptionName: null,
    maxProfiles: null,
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
  case PROFILE_COUNT_TIER_LEVEL: {
    return {
      ...state,
      tierLevelInfo: {
        ...state.tierLevelInfo,
        count: payload,
      },
    };
  }
  case SUBSCRIPTION_INFO: {
    return {
      ...state,
      tierLevelInfo: {
        ...state.tierLevelInfo,
        ...payload,
      },
    };
  }
  default:
    return state;
  }
}

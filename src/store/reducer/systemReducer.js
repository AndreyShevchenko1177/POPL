import { PROFILE_DATA } from "../actionTypes";

const initialState = {
  profileData: {},
};

export default function systemReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PROFILE_DATA: {
      return {
        ...state,
        profileData: payload,
      };
    }
    default:
      return state;
  }
}

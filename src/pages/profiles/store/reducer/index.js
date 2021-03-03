import {
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  ADD_PROFILES_SUCCESS,
  ADD_PROFILES_FAIL,
  EDIT_PROFILES_SUCCESS,
  EDIT_PROFILES_FAIL,
  GET_DATA_PROFILES_SUCCESS,
} from "../actionTypes";

const initialState = {
  allProfiles: {
    data: [],
    error: null,
  },
  addProfile: {
    data: null,
    error: null,
  },
  editProfile: {
    data: null,
    error: null,
  },
  dataProfiles: {
    data: null,
    error: null,
  },
};

export default function profilesReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case GET_PROFILES_SUCCESS: {
      return {
        ...state,
        allProfiles: {
          ...state.allProfiles,
          data: payload,
        },
      };
    }
    case GET_PROFILES_FAIL: {
      return {
        ...state,
        allProfiles: {
          ...state.allProfiles,
          data: [],
          error: payload,
        },
      };
    }
    case ADD_PROFILES_SUCCESS: {
      return {
        ...state,
        addProfile: {
          ...state.addProfile,
          data: payload,
        },
      };
    }
    case ADD_PROFILES_FAIL: {
      return {
        ...state,
        addProfile: {
          ...state.addProfile,
          data: null,
          error: payload,
        },
      };
    }
    case EDIT_PROFILES_SUCCESS: {
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          data: payload,
        },
      };
    }
    case EDIT_PROFILES_FAIL: {
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          data: null,
          error: payload,
        },
      };
    }
    case GET_DATA_PROFILES_SUCCESS: {
      const business = payload.business
        ?.sort((a, b) => a.id - b.id)
        .filter((_, index) => index < 5);
      const social = payload.social
        ?.sort((a, b) => a.id - b.id)
        .filter((_, index) => index < 5);
      return {
        ...state,
        dataProfiles: {
          ...state.dataProfiles,
          data: [{ ...payload, business, social }],
          error: null,
        },
      };
    }
    default:
      return state;
  }
}

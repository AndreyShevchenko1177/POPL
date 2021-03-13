import {
  ADD_PROFILES_SUCCESS,
  ADD_PROFILES_FAIL,
  EDIT_PROFILES_SUCCESS,
  EDIT_PROFILES_FAIL,
  GET_DATA_PROFILES_SUCCESS,
  GET_DATA_PROFILES_FAIL,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAIL,
  CLEAR_ADD_LINK,
} from "../actionTypes";

const initialState = {
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
  profilesIds: {
    data: null,
    error: null,
  },
  addLink: {
    data: null,
    error: null,
  },
};

export default function profilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
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
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: payload,
        error: null,
      },
    };
  }
  case GET_DATA_PROFILES_FAIL: {
    return {
      ...state,
      dataProfiles: {
        ...state.dataProfiles,
        data: null,
        error: payload,
      },
    };
  }
  case ADD_LINK_SUCCESS: {
    return {
      ...state,
      addLink: {
        data: payload,
        error: null,
      },
    };
  }
  case ADD_LINK_FAIL: {
    return {
      ...state,
      addLink: {
        data: payload,
        error,
      },
    };
  }
  case CLEAR_ADD_LINK: {
    return {
      ...state,
      addLink: initialState.addLink,
    };
  }
  default:
    return state;
  }
}

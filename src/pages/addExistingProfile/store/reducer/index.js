import {
  ADD_CHILD_PROFILE_SUCCESS,
  ADD_CHILD_PROFILE_FAIL,
  SIGN_IN_CHILD_SUCCESS,
  SIGN_IN_CHILD_FAIL,
  INVITE_BY_EMAIL_SUCCESS,
  INVITE_BY_EMAIL_FAIL,
  IS_DATA_FETCHING,
  FILES_LIST,
  ADD_EMAIL,
  REMOVE_FILE,
  CLEAR_STATE,
} from "../actionTypes";

const initialState = {
  addChildProfile: {
    data: null,
    error: null,
  },
  childSignIn: {
    data: null,
    error: null,
  },
  inviteByEmail: {
    success: false,
    error: null,
  },
  filesList: {},
  isFetching: false,
};

export default function addProfilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  case ADD_CHILD_PROFILE_SUCCESS: {
    return {
      ...state,
      addChildProfile: {
        data: payload,
        error: null,
      },
    };
  }
  case ADD_CHILD_PROFILE_FAIL: {
    return {
      ...state,
      addChildProfile: {
        data: null,
        error: payload,
      },
    };
  }
  case SIGN_IN_CHILD_SUCCESS: {
    return {
      ...state,
      childSignIn: {
        data: payload,
        error: null,
      },
    };
  }
  case SIGN_IN_CHILD_FAIL: {
    return {
      ...state,
      childSignIn: {
        data: null,
        error: payload,
      },
    };
  }
  case INVITE_BY_EMAIL_SUCCESS: {
    return {
      ...state,
      inviteByEmail: {
        success: true,
        error: null,
      },
    };
  }
  case INVITE_BY_EMAIL_FAIL: {
    return {
      ...state,
      inviteByEmail: {
        success: false,
        error: payload,
      },
    };
  }
  case IS_DATA_FETCHING: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  case FILES_LIST: {
    return {
      ...state,
      filesList: {
        ...state.filesList,
        [payload.fileName]: payload.emails,
      },
    };
  }
  case ADD_EMAIL: {
    return {
      ...state,
      filesList: {
        ...state.filesList,
        emailsFromTextField: [...state.emailsFromTextField, payload],
      },
    };
  }
  case REMOVE_FILE: {
    if (!payload) {
      return {
        ...state,
        filesList: initialState.filesList,
      };
    }
    const result = { ...state.filesList };
    delete result[payload];
    return {
      ...state,
      filesList: result,
    };
  }
  case CLEAR_STATE: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  default:
    return state;
  }
}

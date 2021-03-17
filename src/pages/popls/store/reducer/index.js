import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
  COLLECT_SELECTED_POPLS_REQUEST,
  COLLECT_SELECTED_POPLS_SUCCESS,
  COLLECT_SELECTED_POPLS_FAIL,
  RETRIEVE_SELECTED_POPLS,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  CLEAR_EDIT_POPL,
  CLEAR_ADD_POPL,
  CLEAR_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";

const initialState = {
  allPopls: {
    data: [],
    error: null,
  },
  addPopl: {
    data: null,
    error: null,
  },
  editPopl: {
    data: null,
    error: null,
  },
  collectPopl: {
    allPopls: null,
    data: null,
    error: null,
    isFetching: false,
  },
  profilesIds: {
    data: [],
    error: null,
  },
  isFetching: false,
};

export default function poplsReducer(state = initialState, { type, payload, error }) {
  switch (type) {
  case GET_POPLS_SUCCESS: {
    return {
      ...state,
      allPopls: {
        error: null,
        data: payload,
      },
    };
  }
  case GET_POPLS_FAIL: {
    return {
      ...state,
      allPopls: {
        data: [],
        error: payload,
      },
    };
  }
  case ADD_POPLS_SUCCESS: {
    return {
      ...state,
      addPopl: {
        error: null,
        data: payload,
      },
    };
  }
  case ADD_POPLS_FAIL: {
    return {
      ...state,
      addPopl: {
        data: null,
        error: payload,
      },
    };
  }
  case EDIT_POPLS_SUCCESS: {
    return {
      ...state,
      editPopl: {
        data: payload,
        error: null,
      },
    };
  }
  case EDIT_POPLS_FAIL: {
    return {
      ...state,
      editPopl: {
        data: null,
        error: payload,
      },
    };
  }
  case COLLECT_SELECTED_POPLS_REQUEST: {
    return {
      ...state,
      collectPopl: {
        isFetching: true,
      },
    };
  }
  case COLLECT_SELECTED_POPLS_SUCCESS: {
    return {
      ...state,
      collectPopl: {
        data: payload,
        allPopls: payload,
        error: null,
        isFetching: true,
      },
    };
  }
  case COLLECT_SELECTED_POPLS_FAIL: {
    return {
      ...state,
      collectPopl: {
        data: null,
        allPopls: null,
        error,
        isFetching: true,
      },
    };
  }
  case RETRIEVE_SELECTED_POPLS: {
    return {
      ...state,
      collectPopl: {
        ...state.collectPopl,
        data: state.allPopls.data,
        error: null,
      },
    };
  }
  case GET_PROFILES_IDS_SUCCESS: {
    return {
      ...state,
      profilesIds: {
        data: payload,
        error: null,
      },
    };
  }
  case GET_PROFILES_IDS_FAIL: {
    return {
      ...state,
      profilesIds: {
        data: null,
        error,
      },
    };
  }
  case IS_DATA_FETCHING: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  case CLEAR_EDIT_POPL: {
    return {
      ...state,
      editPopl: initialState.editPopl,
    };
  }
  case CLEAR_ADD_POPL: {
    return {
      ...state,
      addPopl: initialState.addPopl,
    };
  }
  case CLEAR_DATA: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  default:
    return state;
  }
}

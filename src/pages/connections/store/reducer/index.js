import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  ADD_CONNECTIONS_SUCCESS,
  ADD_CONNECTIONS_FAIL,
  EDIT_CONNECTIONS_SUCCESS,
  EDIT_CONNECTIONS_FAIL,
  CLEAR_EDIT_CONNECTIONS,
  CLEAR_ADD_CONNECTIONS,
  COLLECT_SELECTED_CONNECTIONS_SUCCESS,
  COLLECT_SELECTED_CONNECTIONS_FAIL,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  RETRIEVE_SELECTED_CONNECTIONS,
} from "../actionTypes";

const initialState = {
  allConnections: {
    data: [],
    error: null,
  },
  addConnection: {
    data: null,
    error: null,
  },
  editConnection: {
    data: null,
    error: null,
  },
  collectConnections: {
    data: null,
    allConnections: null,
    error: null,
  },
  profilesIds: {
    data: [],
    error: null,
  },
};

export default function connectionsReducer(state = initialState, { type, payload, error }) {
  switch (type) {
  case GET_CONNECTIONS_SUCCESS: {
    return {
      ...state,
      allConnections: {
        error: null,
        data: payload,
      },
    };
  }
  case GET_CONNECTIONS_FAIL: {
    return {
      ...state,
      allConnections: {
        data: [],
        error: payload,
      },
    };
  }
  case ADD_CONNECTIONS_SUCCESS: {
    return {
      ...state,
      addConnection: {
        error: null,
        data: payload,
      },
    };
  }
  case ADD_CONNECTIONS_FAIL: {
    return {
      ...state,
      addConnection: {
        data: null,
        error: payload,
      },
    };
  }
  case EDIT_CONNECTIONS_SUCCESS: {
    return {
      ...state,
      editConnection: {
        data: payload,
        error: null,
      },
    };
  }
  case EDIT_CONNECTIONS_FAIL: {
    return {
      ...state,
      editConnection: {
        data: null,
        error: payload,
      },
    };
  }
  case COLLECT_SELECTED_CONNECTIONS_SUCCESS: {
    return {
      ...state,
      collectConnections: {
        data: payload,
        allConnections: payload,
        error: null,
      },
    };
  }
  case COLLECT_SELECTED_CONNECTIONS_FAIL: {
    return {
      ...state,
      collectConnections: {
        data: null,
        allConnections: null,
        error,
      },
    };
  }
  case RETRIEVE_SELECTED_CONNECTIONS: {
    return {
      ...state,
      collectConnections: {
        ...state.collectConnections,
        data: state.allConnections.data,
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
  case CLEAR_EDIT_CONNECTIONS: {
    return {
      ...state,
      editConnection: initialState.editConnection,
    };
  }
  case CLEAR_ADD_CONNECTIONS: {
    return {
      ...state,
      addConnection: initialState.addConnection,
    };
  }
  default:
    return state;
  }
}

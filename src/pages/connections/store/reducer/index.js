import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  CLEAR_EDIT_CONNECTIONS,
  CLEAR_ADD_CONNECTIONS,
  COLLECT_SELECTED_CONNECTIONS_SUCCESS,
  COLLECT_SELECTED_CONNECTIONS_FAIL,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  RETRIEVE_SELECTED_CONNECTIONS,
  CLEAR_CONNECTIONS_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";

const initialState = {
  collectConnections: {
    data: null,
    allConnections: null,
    error: null,
  },
  profilesIds: {
    data: [],
    error: null,
  },
  isFetching: false,
};

export default function connectionsReducer(state = initialState, { type, payload, error }) {
  switch (type) {
  case GET_CONNECTIONS_SUCCESS: {
    return {
      ...state,
      collectConnections: {
        data: payload,
        error: null,
        isFetching: true,
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
  case COLLECT_SELECTED_CONNECTIONS_SUCCESS: {
    return {
      ...state,
      collectConnections: {
        data: payload[payload.type],
        connections: payload,
        error: null,
      },
      isFetching: false,
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
      isFetching: false,
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
  case IS_DATA_FETCHING: {
    return {
      ...state,
      isFetching: payload,
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
  case CLEAR_CONNECTIONS_DATA: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  default:
    return state;
  }
}

import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  ADD_CONNECTIONS_SUCCESS,
  ADD_CONNECTIONS_FAIL,
  EDIT_CONNECTIONS_SUCCESS,
  EDIT_CONNECTIONS_FAIL,
  CLEAR_EDIT_CONNECTIONS,
  CLEAR_ADD_CONNECTIONS,
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
};

export default function connectionsReducer(state = initialState, { type, payload }) {
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

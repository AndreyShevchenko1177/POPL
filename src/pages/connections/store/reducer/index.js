import { formatDateConnections } from "../../../../utils";
import {
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  CLEAR_EDIT_CONNECTIONS,
  CLEAR_ADD_CONNECTIONS,
  GET_PROFILES_IDS_SUCCESS,
  GET_PROFILES_IDS_FAIL,
  SHOW_ALL_CONNECTIONS,
  SHOW_CONNECTIONS_BY_PROFILE_ID,
  CLEAR_CONNECTIONS_DATA,
  IS_DATA_FETCHING,
} from "../actionTypes";

const initialState = {
  connections: {
    data: null,
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
      connections: {
        data: payload,
        error: null,
      },
      isFetching: false,
    };
  }
  case GET_CONNECTIONS_FAIL: {
    return {
      ...state,
      connections: {
        data: null,
        error: payload,
      },
      isFetching: false,
    };
  }
  case SHOW_ALL_CONNECTIONS: {
    return {
      ...state,
      connections: {
        data: {
          ...state.connections.data,
          allConnections: [...state.connections.data.connections],
        },
        error: null,
      },
      isFetching: false,
    };
  }
  case SHOW_CONNECTIONS_BY_PROFILE_ID: {
    return {
      ...state,
      connections: {
        data: {
          ...state.connections.data,
          allConnections: state.connections.data.connectionsObject[payload].sort((a, b) => new Date(formatDateConnections(b.time)) - new Date(formatDateConnections(a.time))),
        },
        error: null,
      },
      isFetching: false,
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

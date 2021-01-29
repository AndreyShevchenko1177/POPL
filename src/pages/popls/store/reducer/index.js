import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
  CLEAR_EDIT_POPL,
  CLEAR_ADD_POPL,
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
};

export default function poplsReducer(state = initialState, { type, payload }) {
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
    default:
      return state;
  }
}

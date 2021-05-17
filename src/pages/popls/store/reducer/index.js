import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPLS_SUCCESS,
  ADD_POPLS_FAIL,
  EDIT_POPLS_REQUEST,
  EDIT_POPLS_SUCCESS,
  EDIT_POPLS_FAIL,
  CLEAR_EDIT_POPL,
  CLEAR_ADD_POPL,
  CLEAR_DATA,
  IS_DATA_FETCHING,
  GET_POPS_FOR_POPLS_SUCCESS,
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
    isFetching: {},
  },
  allPops: {
    data: null,
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
      isFetching: false,
    };
  }
  case GET_POPLS_FAIL: {
    return {
      ...state,
      allPopls: {
        data: [],
        error: payload,
      },
      isFetching: false,
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
  case EDIT_POPLS_REQUEST: {
    return {
      ...state,
      editPopl: {
        data: null,
        error: null,
        isFetching: payload,
      },
    };
  }
  case EDIT_POPLS_SUCCESS: {
    return {
      ...state,
      allPopls: {
        data: state.allPopls.data.map((el) => (el.id === payload.id ? ({ ...el, nickname: payload.nickname, photo: payload.photo }) : el)),
        error: payload,
      },
      editPopl: {
        ...state.editPopl,
        isFetching: {},
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
  case GET_POPS_FOR_POPLS_SUCCESS: {
    return {
      ...state,
      allPops: {
        data: payload,
        error: null,
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

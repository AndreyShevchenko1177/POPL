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
    isFetching: false,
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
    const correctProperties = {
      sNickName: "nickname",
      sName: "name",
      sSlug: "url",
    };
    const [property, value] = payload.item;
    return {
      ...state,
      allPopls: {
        data: state.allPopls.data.map((el) => (el.id === payload.id ? ({ ...el, [correctProperties[property]]: value }) : el)),
        error: payload,
      },
      editPopl: {
        ...state.editPopl,
        isFetching: { [payload.id]: false },
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

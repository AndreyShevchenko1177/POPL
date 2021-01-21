import {
  GET_POPLS_SUCCESS,
  GET_POPLS_FAIL,
  ADD_POPL_SUCCESS,
  ADD_POPL_FAIL,
  EDIT_POPL_SUCCESS,
  EDIT_POPL_FAIL,
} from "../actionTypes";

const initialState = {
  allPopls: {
    data: null,
    error: null,
  },
  addPopl: {
    data: null,
    error: null,
  },
};

export default function AuthReducer(
  state = initialState,
  { type, payload, name }
) {
  switch (type) {
    case GET_POPLS_SUCCESS: {
      return {
        ...state,
        allPopls: {
          ...state.allPopls,
          data: payload,
        },
      };
    }
    case GET_POPLS_FAIL: {
      return {
        ...state,
        allPopls: {
          ...state.allPopls,
          data: null,
          error: payload,
        },
      };
    }
    case ADD_POPL_SUCCESS: {
      return {
        ...state,
        addPopl: {
          ...state.addPopl,
          data: payload,
        },
      };
    }
    case ADD_POPL_FAIL: {
      return {
        ...state,
        addPopl: {
          ...state.addPopl,
          data: null,
          error: payload,
        },
      };
    }
    default:
      return state;
  }
}

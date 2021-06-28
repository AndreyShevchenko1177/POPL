import {
  ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST, IS_FETCHING,
} from "../actionTypes";

const initialState = {
  addProfileByRandomEmailSuccess: false,
  isFetching: false,
  filesList: {},
};

export default function createNewAccountReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_NEW_PROFILE_BY_RANDOM_EMAIL: {
    return {
      ...state,
      addProfileByRandomEmailSuccess: true,
      isFetching: false,
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
  case FILES_LIST: {
    return {
      ...state,
      filesList: {
        ...state.filesList,
        [payload.fileName]: payload.emails,
      },
    };
  }
  case IS_FETCHING: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  case CLEAR: {
    return {
      ...state,
      [payload]: false,
    };
  }
  default: {
    return state;
  }
  }
}

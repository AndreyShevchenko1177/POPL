import {
  ADD_NEW_PROFILE_BY_EMAIL, ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR, REMOVE_FILE, FILES_LIST, IS_FETCHING,
} from "../actionsType";

const initialState = {
  addProfileByEmailSuccess: false,
  addProfileByRandomEmailSuccess: false,
  isFetching: false,
  filesList: {},
};

export default function newProfileReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_NEW_PROFILE_BY_EMAIL: {
    return {
      ...state,
      addProfileByEmailSuccess: true,
      isFetching: false,
    };
  }
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

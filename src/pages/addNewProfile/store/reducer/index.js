import { ADD_NEW_PROFILE_BY_EMAIL, ADD_NEW_PROFILE_BY_RANDOM_EMAIL, CLEAR } from "../actionsType";

const initialState = {
  addProfileByEmailSuccess: false,
  addProfileByRandomEmailSuccess: false,
};

export default function newProfileReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_NEW_PROFILE_BY_EMAIL: {
    return {
      ...state,
      addProfileByEmailSuccess: true,
    };
  }
  case ADD_NEW_PROFILE_BY_RANDOM_EMAIL: {
    return {
      ...state,
      addProfileByRandomEmailSuccess: true,
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

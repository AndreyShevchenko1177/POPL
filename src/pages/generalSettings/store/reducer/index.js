import {
  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_FAIL,
  IS_DATA_FETCHING,
  CLEAR_STATE,
  IS_FILE_CONVERTING,
} from "../actionTypes";

const initialState = {
  companyInfo: {
    data: null,
    error: null,
  },
  isFetching: false,
  isFileConverting: false,
};

export default function generalSettingsReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  case GET_COMPANY_INFO_SUCCESS: {
    return {
      ...state,
      companyInfo: {
        data: payload,
        error: null,
      },
      isFetching: false,
    };
  }
  case GET_COMPANY_INFO_FAIL: {
    return {
      ...state,
      companyInfo: {
        data: null,
        error: payload,
      },
      isFetching: false,
    };
  }
  case IS_DATA_FETCHING: {
    return {
      ...state,
      isFetching: payload,
    };
  }
  case CLEAR_STATE: {
    return {
      ...state,
      [payload]: initialState[payload],
    };
  }
  case IS_FILE_CONVERTING: {
    return {
      ...state,
      isFileConverting: payload,
    };
  }
  default:
    return state;
  }
}

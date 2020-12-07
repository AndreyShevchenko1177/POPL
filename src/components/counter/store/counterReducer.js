import { INCREASE, DECREASE, RESET } from "./constants";

const initState = {
  count: 0,
};

export default function counterReducer(state = initState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case DECREASE:
      return {
        ...state,
        count: state.count - action.payload,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}

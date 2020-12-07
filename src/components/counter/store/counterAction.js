import { INCREASE, DECREASE, RESET } from "./constants";

export function increase(payload) {
  return {
    type: INCREASE,
    payload,
  };
}

export function decrease(payload) {
  return {
    type: DECREASE,
    payload,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

import { SIGN_IN_SUCCESS, LOGOUT } from "../../../auth/store/actionTypes";
import { PARAGON_NEW_JWT } from "../actionTypes";

const initialState = "";

export default function paragonReducer(state = initialState, { type, payload }) {
  console.group("type, payload");
  console.log(type, payload);
  console.groupEnd();

  if ([SIGN_IN_SUCCESS, LOGOUT].includes(type)) {
    return initialState;
  }

  if (type === PARAGON_NEW_JWT) {
    return payload;
  }

  return state;
}

import {

} from "../actionTypes";

const initialState = {

  isFetching: false,
};

export default function profilesReducer(
  state = initialState,
  { type, payload, error },
) {
  switch (type) {
  default:
    return state;
  }
}

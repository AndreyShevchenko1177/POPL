/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
import {
  SAVE_JWT_TOKEN,
} from "../actionTypes";

import * as requests from "./requests";

export const saveJwtTokenAction = (token) => ({
  type: SAVE_JWT_TOKEN,
  payload: token,
});

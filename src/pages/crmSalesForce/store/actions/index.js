import { PARAGON_NEW_JWT } from "../actionTypes";

export const newParagonJwtAction = (payload) => ({
  type: PARAGON_NEW_JWT,
  payload,
});

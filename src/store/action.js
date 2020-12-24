import { DISPLAY_NOTIFICATION } from "./constant";

export const displayNotification = (data) => ({
  type: DISPLAY_NOTIFICATION,
  data,
});

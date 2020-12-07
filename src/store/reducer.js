const initialstate = {
  notifyData: {
    open: false,
    message: "",
    duration: 6000,
    severity: "success",
  },
};

// reducers.js
const commonReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "DISPLAY_NOTIFICATION":
      const { open, message, duration, severity } = action.data;
      return {
        ...state,
        notifyData: {
          ...state.notifyData,
          open: open,
          message: message ? message : state.notifyData.message,
          duration: duration ? duration : state.notifyData.duration,
          severity: severity ? severity : state.notifyData.severity,
        },
      };
    default:
      return state;
  }
};

export default commonReducer;

import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  dayTimeContainer: {
    // paddingRight: 19,
    width: "100px",
  },
  dash: {
    position: "absolute",
    right: "103px",
    top: 19,
    width: 8,
    "& hr": {
      height: 1,
      width: "100%",
      margin: 0,
      border: 0,
      backgroundColor: "#000000",
    },
  },
  allDayDash: {
    position: "absolute",
    right: 140,
    top: 19,
    width: 8,
    "& hr": {
      height: 1,
      width: "100%",
      margin: 0,
      border: 0,
      backgroundColor: "#000000",
    },
  },
}));

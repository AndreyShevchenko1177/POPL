import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    padding: "70px 25px 0px 25px",
    position: "relative",
  },
  headerContainer: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
  },
  headerTitleContainer: {
    // flexGrow: 1,
    display: "flex",
    alignItems: "100%",
    hight: "100%",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    "@media(max-width: 1200px)": {
      position: "static",
      marginLeft: 20,
      transform: "none",
    },
  },
  todayButtonContainer: {
    paddingRight: 10,
  },
  headerButtonRoot: {
    padding: 2,
  },
  calendarWrapper: {
    // paddingTop: 10,
    paddingBottom: 10,
  },
  daysContainer: {
    position: "relative",
    width: "100%",
    minHeight: 150,
    color: "#211a17",
    width: "100%",
  },
  daysWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridAutoRows: ({ vh, px }) => `minmax(calc(${vh}vh + ${px}px), auto)`,
    borderTop: "#d4d4d4 1px solid",
    borderLeft: "#d4d4d4 1px solid",
  },
  dayContainer: {
    position: "relative",
    width: "100%",
    minHeight: 85,
    borderRight: "#d4d4d4 1px solid",
    borderBottom: "#d4d4d4 1px solid",
    color: "#211a17",
    overflow: "hidden",
  },
  dayWrapper: {
    padding: "0px .5em",
  },
  weekDay: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 5,
    "& > span": {
      color: "#70757a",
      fontSize: 11,
      fontWeight: 500,
      lineHeight: "20px",
    },
  },
  dayNumber: {
    transition: "background-color 100ms linear",
    borderRadius: "2em",
    padding: 2,
    color: "#3c4043",
    fontSize: 12,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#c8cacd",
    },
  },
  pastDayStyle: {
    backgroundColor: "#f4f2f2",
  },
  presentDayStyle: {
    backgroundColor: "#ffffff",
  },
  futureDayStyle: {
    backgroundColor: "#e9f1fe",
  },
  currentDay: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1967d2",
    },
  },
  firstMonthDayWidth: {
    width: "40%",
  },
  eventTime: {
    marginRight: "6px",
    width: "60px",
    whiteSpace: "nowrap",
  },
  eventTitle: {
    fontWeight: "700",
    fontSize: "1.1em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    minHeight: "1em",
  },
  eventCircleBlue: {
    minWidth: "8px",
    minHeight: "8px",
    // backgroundColor: "red",
    border: "1px solid blue",
    borderRadius: "50%",
    marginRight: "3px",
  },
  eventCircleAllDay: {
    minWidth: "8px",
    minHeight: "8px",
    backgroundColor: "blue",
    border: "1px solid blue",
    borderRadius: "50%",
    marginRight: "3px",
  },
  eventWrapper: {
    transition: "background-color 100ms linear",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "3px",
    borderRadius: "5px",
    padding: "0 3px",
    "&:hover": {
      backgroundColor: "#c8cacd",
      cursor: "pointer",
    },
  },
  eventWrapperAllDay: {
    backgroundColor: "#e9f1fe",
  },
  popperRoot: {
    borderRadius: "0.3em",
    border: "1px solid #000000",
    boxShadow: "2px 2px 10px 0px rgba(0,0,0,0.5)",
    padding: "20px",
  },
}));

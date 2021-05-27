import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    position: "absolute",
    minWidth: "675px",
    top: "70%",
    left: "50%",
    backgroundColor: "#fff",
  },
  mainContainer: {
    padding: "20px 15px 0px 15px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderStyle: "double",
    border: "0px",
    borderBottomWidth: "1px",
    paddingBottom: 10,
    marginBottom: 15,
  },
  strategyContainer: {
    "& h5": {
      paddingBottom: 15,
    },
  },
  strategy: {
    display: "flex",
    justifyContent: "space-between",
    "&  > div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 30px 15px 25px",
      borderRadius: 2,
      cursor: "pointer",
    },
    "& svg": {
      width: "45px",
      height: "45px",
    },
  },
  strategyItems: {
    "& > div": {
      paddingTop: 10,
    },
  },
  calendarContainer: {
    "& > div:first-child": {
      width: "25%",
      marginRight: 5,
    },
    "& > div:last-child": {
      width: "calc(75% - 5px)",
    },
    "& > div > div": {
      width: "100%",
      //   height: 40,
      paddingLeft: 0,
    },
  },
}));

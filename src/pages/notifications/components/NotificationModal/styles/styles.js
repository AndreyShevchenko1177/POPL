import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: "675px",
    height: 420,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  mainContainer: {
    padding: "20px 15px 20px 15px",
    height: "100%",
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
  timeContainer: {
    fontSize: "15px",
    fontWeight: "700",
    padding: "10px 0 0 0",
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
  bottomButtons: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: "flex",
    justifyContent: "flex-end",
    width: "auto",
    padding: "10px 0 0 0",
    "& > button": {
      marginLeft: 10,
    },
  },
  calendarContainer: {
    display: "flex",
    "& > div:first-child": {
      width: "25%",
      minWidth: 180,
      marginRight: 5,
    },
    "& > div:last-child": {
      width: "calc(75% - 5px)",
      maxWidth: 460,
    },
    "& > div > div": {
      width: "100%",
      paddingLeft: 0,
    },
  },
}));

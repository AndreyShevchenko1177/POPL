import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "20px 20px",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
  priceDescriptionContainer: {
    display: "flex",
    minHeight: 85,
    flexDirection: "column",
    paddingTop: 10,
    "& span": {
      fontSize: "20px",
      fontWeight: "bold",
      // padding: "10px 0",
    },
  },
  buttonContainer: {
    padding: 0,
    width: "100%",
  },
  labelsContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
  },
  labelsItem: {
    display: "flex",
    // alignItems: "center",
    paddingBottom: 10,
    "& > div:first-child": {
      margin: "0px 10px 0 0",
      display: "flex",
      justifyContent: "center",
    },
  },
  labelsItemsText: {
    fontSize: "14px !important",
  },
  labelIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  subscriptionButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#1791f4",
    borderRadius: 4,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1791f4",
    },
  },
  currentPlan: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    width: 110,
    height: 28,
    fontWeight: "bold",
    backgroundColor: "#1791f4",
    borderRadius: 5,
    top: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  makeJustProButton: {
    height: 40,
    width: 170,
    marginTop: 10,
    borderRadius: 4,
    fontSize: "16px",
    fontWeight: "bold",
  },
}));

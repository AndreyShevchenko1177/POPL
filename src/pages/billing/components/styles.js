import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "40px 40px",
    width: "100%",
  },
  title: {
    paddingBottom: 20,
  },
  priceDescriptionContainer: {
    display: "flex",
    minHeight: 90,
    flexDirection: "column",
    paddingTop: 10,
    "& span:first-child": {
      fontSize: "16px",
      paddingBottom: 8,
    },
  },
  buttonContainer: {
    padding: "0 0 30px 0",
    width: "100%",
  },
  labelsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  labelsItem: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
    "&:first-child": {
      fontWeight: "bold",
    },
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
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1791f4",
    },
  },
}));
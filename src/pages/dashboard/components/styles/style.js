import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: "300px",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.custom.mainBorderForBigElement,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: "10px",
    borderRadius: theme.custom.mainBorderForBigElement,
  },
  header_icon: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "0.5px solid grey",
    paddingBottom: "10px",
    height: "220px",
    alignItems: "center",
  },
  userIcon: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
  },
  header_body: {
    padding: "10px",
  },
  footer: {
    padding: "20px 10px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#8b848924",
  },
  button: {
    height: "40px",
    width: "45%",
    fontFamily: "AvenirNextCyr",
    fontSize: "13px",
    borderRadius: 8,
  },
  chartContainer: {
    position: "relative",
    minHeight: "400px",
  },
}));

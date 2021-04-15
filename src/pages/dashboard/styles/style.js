import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    position: "relative",
    display: "flex",
    overflowY: "auto",
    minHeight: 260,
    alignItems: "center",
  },
  headingWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  connections_container: {
    padding: "20px 20px 20px 20px",
  },
  chart_container: {
    padding: "10px",
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
  },
  button: {
    height: "50px",
    minWidth: "160px",
    fontFamily: "AvenirNextCyr",
    fontSize: "16px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingBottom: 20,
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
  latestPoplsContainer: {
    padding: "20px 0 0 0",
  },
  showMoreIcon: {
    fontSize: 50,
    cursor: "pointer",
  },
}));

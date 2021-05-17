import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    position: "relative",
    display: "flex",
    overflowY: "auto",
    minHeight: 260,
  },
  headingWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  connections_container: {
    padding: "15px 10px 20px 10px",
  },
  chart_container: {
    padding: "10px",
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
  },
  button: {
    height: "50px",
    minWidth: "160px",
    fontSize: "16px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
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

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: "15px !important",
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    overflowY: "auto",
    minHeight: 260,
  },
  latestConnectionsWrapper: {
    position: "absolute",
    width: "calc(100% - 40px)",
    overflow: "hidden",
    bottom: 17,
    "@media (max-height:800px)": {
      position: "static",
    },
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

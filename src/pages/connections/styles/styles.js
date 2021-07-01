import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  connectionsPageContainer: {
    overflow: "auto",
    height: "100vh",
    outline: "none",
  },
  DroppableConnectionContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    outline: "none",
  },
  poplsHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "20px",
    outline: "none",
  },
  poplCard: {
    width: "200px",
    height: "150px",
    marginRight: "10px",
    padding: "5px",
    outline: "none",
  },
  button: {
    height: "50px",
    minWidth: "150px",
    fontSize: "13px",
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
  connectContainer: {
    position: "relative",
    width: "100%",
    height: 170,
    minWidth: 1000,
    margin: "5px 0",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.custom.mainBorderForBigElement,
    outline: "none",
  },
  connectContainerShadow: {
    boxShadow: theme.custom.mainBoxShadow,
  },
  filtersContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 20,
    outline: "none",
  },
  viaconnectBackground: {
    backgroundColor: "#f3f5f3",
  },
}));

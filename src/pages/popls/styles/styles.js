import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  poplsMainContainer: {
    overflow: "auto",
    height: "100vh",
    outline: "none",
  },
  poplsContainer: {
    display: "flex",
    paddingTop: "15px",
    flexDirection: "column",
    width: "100%",
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
  poplContainer: {
    position: "relative",
    width: "100%",
    height: 170,
    margin: "5px 0",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.custom.mainBorderForBigElement,
    // boxShadow: theme.custom.mainBoxShadow,
    outline: "none",
  },
  filtersContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 20,
    outline: "none",
  },
}));

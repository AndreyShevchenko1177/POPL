import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  poplsContainer: {
    display: "flex",
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
    fontFamily: "AvenirNextCyr",
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
    marginBottom: "10px",
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

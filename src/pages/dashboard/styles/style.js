import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingTop: "20px",
  },
  popl_container: {
    padding: "20px 0px",
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
    fontSize: "13px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
}));

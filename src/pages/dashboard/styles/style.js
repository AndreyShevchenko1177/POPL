import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  popl_container: {
    padding: "20px 0px",
  },
  chart_container: {
    padding: "10px",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
  },
}));

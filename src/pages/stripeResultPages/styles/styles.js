import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  icon: {
    width: "25%",
  },
  resultText: {
    color: theme.palette.specifyText.main,
    fontSize: "22px",
    fontWeight: 500,
  },
  backPageText: {
    color: theme.palette.specifyText.main,
    fontSize: "18px",
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginInputsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  loginInput: {
    width: "50%",
  },
  passwordInputIconbutton: {
    padding: "0 0 0 5px",
  },
  heading: {
    fontSize: "16px !important",
    fontWeight: "bold",
    paddingBottom: 10,
  },
}));

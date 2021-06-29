import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: 70,
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
  inputHeading: {
    fontSize: "16px !important",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  textBelowInput: {
    padding: 0,
  },
  gridWithoutPadding: {
    padding: "0 !important",
  },
}));

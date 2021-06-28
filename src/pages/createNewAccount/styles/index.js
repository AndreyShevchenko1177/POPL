import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: 100,
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
    fontWeight: "bold !important",
    paddingTop: 20,
  },
  textBelowInput: {
    padding: 0,
  },
  gridWithoutPadding: {
    padding: "0 !important",
  },
}));

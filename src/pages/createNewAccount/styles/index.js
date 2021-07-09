import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: 70,
    minWidth: 700,
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
    padding: "10px 0",
  },
  gridWithoutPadding: {
    padding: "0 !important",
  },
  orSectionWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 20,
    padding: "70px 20px 20px",
  },
  orSectionHr: {
    width: "45%",
    "& > hr": {
      margin: 0,
    },
  },
  orSectionText: {
    width: "10%",
    height: "100%",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: 70,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: 500,
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: 10,
  },
  sendAsBtnWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  sendAsBtn: {
    width: "40%",
  },
  confirmBtnWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  confirmBtn: {
    width: "40%",
  },
}));

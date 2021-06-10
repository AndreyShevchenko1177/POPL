import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    paddingTop: 70,
    display: "flex",
    width: "100%",
    minWidth: 920,
    maxWidth: 1300,
    margin: "0 auto",
  },
  rootFieldsWrapper: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    padding: "0 20px",
  },
  rootFields: {
    // margin: "0 auto",
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
    justifyContent: "center",
  },
  confirmBtn: {
    width: "40%",
  },
  opacityBackground: {
    top: "-24px",
    left: "-40px",
    width: "calc(100% + 80px)",
    height: "calc(100% + 48px)",
    minHeight: "100vh",
    backgroundColor: theme.custom.modalOpacityBackground,
    opacity: theme.custom.modalOpacity,
    position: "fixed",
    zIndex: 101,
  },
  wizardContainer: {
    position: "fixed",
    top: "calc(50%)",
    left: "calc(50% - 200px)",
    transform: "translateY(-50%)",
    zIndex: 1050,
    outline: "none",
  },
  formLabels: {
    fontSize: "18px !important",
    fontWeight: "bold",
  },
}));

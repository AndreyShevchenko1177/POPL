import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "70px 40px 50px 40px",
    display: "flex",
    width: "100%",
    minWidth: 920,
    maxWidth: 1300,
    margin: "0 auto",
  },
  rootFieldsWrapper: {
    // width: "50%",
    display: "flex",
    justifyContent: "center",
    padding: "0 20px 0 0",
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
    position: "relative",
    flexDirection: "column",
    width: "100%",
    paddingBottom: 10,
    // "& textarea": {
    //   paddingRight: 50,
    // },
  },
  attachment: {
    display: "flex",
    position: "absolute",
    bottom: 20,
    right: 40,
    "& *": {
      cursor: "pointer",
    },
    "& input": {
      display: "none",
    },
    zIndex: 3,
  },
  attachmentWithoutScrollBar: {
    right: 15,
  },
  borderWrapper: {
    position: "absolute",
    width: 480,
    top: 30,
    height: 200,
    border: "1px solid #b3b3b3",
    borderRadius: 4,
    zIndex: 1,
  },
  fullBorderWidth: {
    width: 500,
  },
  emailListRoot: {
    height: 200,
    overflow: "auto",
  },
  emailListContainer: {
    padding: 10,
    height: 200,
    overflow: "auto",
    zIndex: 2,
  },
  emailRow: {
    padding: "6px 0px",
    display: "flex",
    position: "relative",
    "& p:first-child": {
      width: "35%",
      paddingRight: 5,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    "& p:nth-child(2)": {
      width: "55%",
      //   paddingRight: 5,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    "& h5:first-child": {
      width: 190,
    },
  },
  deleteIcon: {
    position: "absolute",
    right: 0,
    cursor: "pointer",
    "& svg": {
      fill: "#808080",
      width: 22,
      height: 22,
    },
  },
  deleteFile: {
    position: "absolute",
    right: 0,
    top: -17,
    cursor: "pointer",
    "& svg": {
      fill: "#808080",
      width: 22,
      height: 22,
    },
  },
  filePreview: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > div": {
      padding: "0px 10px 5px 0px",
      "& img": {
        width: 45,
        height: 45,
      },
    },

  },
  emailHeader: {
    padding: 0,
    marginBottom: 5,
    marginTop: 5,
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
    position: "absolute",
    zIndex: 1001,
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

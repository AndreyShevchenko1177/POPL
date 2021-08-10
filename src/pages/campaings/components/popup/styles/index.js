import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  opacityBackground: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: theme.custom.modalOpacityBackground,
    opacity: theme.custom.modalOpacity,
    position: "absolute",
    zIndex: 1001,
  },
  calendarModalRoot: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minHeight: 500,
    width: 490,
    maxHeight: 740,
    zIndex: 1002,
    padding: "15px 15px 15px 50px",
  },
  titleInput: {
    fontSize: 22,
  },
  addAccountsWrapper: {
    marginBottom: "20px",
  },
  createLinkBtn: {
    width: 150,
  },
  timeWrapper: {
    width: "100%",
    position: "relative",
  },
  timeIcon: {
    position: "absolute",
    left: -34,
    bottom: 2,
  },
  addAccountsBtnWrapper: {
    width: "100%",
    position: "relative",
  },
  addAccountsBtn: {
    width: "100%",
    height: 36,
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  accountsList: {
    width: "100%",
    height: 105,
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: 4,
    overflow: "auto",
    marginTop: 10,
  },
  accountIcon: {
    width: 30,
    height: 35,
    position: "absolute",
    top: 5,
    left: "-30px",
  },
  recipientItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 10,
    width: "100%",
    maxWidth: "300px",

  },
  recipientsDeleteIcon: {
    marginLeft: "auto",
    cursor: "pointer",
    "& svg": {
      fill: "#808080",
      width: 22,
      height: 22,
    },
  },
  recipientItemName: {
    fontWeight: "bold",
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  repeatSelectRoot: {
    padding: "0px 8px 10px 8px",
  },
  allDayLabel: {
    fontSize: "14px !important",
    border: "none",
    textAlign: "left",
    padding: 0,
    height: 28,
  },
  linkClicksWrapper: {
    width: 35,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 20,
    "& > span": {
      position: "absolute",
      fontSize: 10,
      bottom: "-20px",
      whiteSpace: "nowrap",
    },
  },
  linksBtnWrapper: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#d8d5d5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 100,
  },
  linksEditWrapper: {
    bottom: -8,
    right: -13,
  },
  linksDeleteWrapper: {
    top: -8,
    right: -13,
  },
  safariLinks: {
    margin: "0px 15px 35px 0px",
  },
  iconItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.iconBoxShadow,
    width: 37,
    height: 37,
    cursor: "pointer",
  },
  iconItemEventPopupMode: {
    cursor: "default",
  },
  linkIcon: {
    transform: "scale(1, 1)",
    width: 30,
    height: 30,
  },
  createAccountBtnWrapper: {
    height: 85,
    display: "flex",
    alignItems: "center",
    padding: "20px 0",
    // justifyContent: "space-between",
  },
  linkTestLinkBtnWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  testLinkBtn: {
    position: "absolute",
    top: 17,
    right: -80,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
    zIndex: 100,
    "& button": {
      padding: 5,
    },
  },
  deleteButton: {
    position: "absolute",
    right: 30,
    top: 0,
    cursor: "pointer",
    zIndex: 100,
    "& button": {
      padding: 5,
    },
  },
  editButton: {
    position: "absolute",
    right: 60,
    top: 0,
    cursor: "pointer",
    zIndex: 100,
    "& button": {
      padding: 5,
    },
  },
  checkboxRoot: {
    padding: "0px 9px 9px 9px",
  },
  checkboxLabel: {
    height: 30,
  },

  eventPopup: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minHeight: 250,
    width: 400,
    maxHeight: 740,
    zIndex: 1002,
    padding: "40px 25px 20px 25px",
    lineHeight: "2.5em",
  },

  wrapperTitleEventPopup: {
    display: "flex",
    alignItems: "baseline",
  },
  restDataWrapperEventPopup: {
    marginLeft: "20px",
  },

  sqrEventPopup: {
    width: "10px",
    height: "10px",
    borderRadius: "2px",
    backgroundColor: "#1967d2",
    marginRight: "10px",
  },
  titleEventPopup: {
    fontSize: "1.2em",
    fontWeight: 700,
    marginRight: "10px",
  },
  dateTimeWrapperEventPopup: {
    display: "flex",
    alignItems: "baseline",
  },
  dateEventPopup: {
    marginRight: "10px",
  },

  roundEventPopup: {
    backgroundColor: "#000000",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    marginRight: "10px",
    alignSelf: "center",
  },

}));

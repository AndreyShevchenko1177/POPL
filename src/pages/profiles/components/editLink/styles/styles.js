import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.custom.mainBorderForBigElement,
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
    zIndex: 1,
  },
  wizardContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "15px",
    backgroundColor: "#ffffff",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderForBigElement,
    zIndex: 50,
    outline: "none",
    "@media (max-height:730px)": {
      top: 70,
      transform: "translate(-50%, 0)",
    },
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "25px",
    cursor: "pointer",
  },
  linksContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    height: "505",
    overflow: "auto",
    "@media(max-width:1400px)": {
      height: 500,
    },
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    width: 420,
    height: 505,
    paddingTop: 15,
    "@media (max-width:1400px)": {
      width: 350,
      height: "100%",
    },
  },
  linkImageValueContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondPageLink: {
    position: "relative",
    width: 200,
    "@media (max-width:1400px)": {
      width: 160,
    },
  },
  secondScreenLinkImage: {
    width: "100%",
  },
  linkText: {
    textAlign: "center",
    paddingBottom: 10,
  },
  link: {
    padding: "10px 10px",
    margin: "10px 10px",
    backgroundColor: "#ffffff",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
    textAlign: "center",
    cursor: "pointer",
  },
  linkInputsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "10px 0 15px 0",
    "@media (max-width:1400px)": {
      padding: "20px 0 20px 0",
    },
  },
  linkValue: {
    position: "relative",
    width: "70%",
    padding: 10,
    textAlign: "center",
    color: theme.palette.specifyText.main,
    overflowWrap: "break-word",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
    minHeight: 40,
  },
  borderRed: {
    border: "1px solid #ff0000",
  },
  errorText: {
    position: "absolute",
    bottom: "-30px",
    left: 10,
    color: "#ff0000",
  },
  btnContainer: {
    width: "50%",
    "& div:first-child": {
      marginBottom: 15,
    },
  },
  rootLinkContainer: {
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: "20px",
    color: "#565956",
    margin: "0 10px",
  },
  rootLink: {
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
  },
  tabContainer: {
    display: "flex",
  },
  tabs: {
    minWidth: "350px",
    width: "40%",
  },
  firstElement: {
    width: "50px",
    borderBottom: "1px solid #b2afaf",
  },
  secondElement: {
    width: "56%",
    borderBottom: "1px solid #b2afaf",
  },
  activeTab: {
    borderBottom: "0px solid #212121",
    borderTop: "1px solid #b2afaf",
    borderLeft: "1px solid #b2afaf",
    borderRight: "1px solid #b2afaf",
    borderRadius: `${theme.custom.mainBorderRadius}px ${theme.custom.mainBorderRadius}px 0 0`,
  },
  tab1: {
    borderBottom: "1px solid #b2afaf",
  },
  tab2: {
    borderBottom: "1px solid #b2afaf",
  },
  labelContainer: {
    // display: "flex",
    width: "65%",
    // justifyContent: "flex-start",
    marginBottom: 5,
  },
  editLink: {
    "& span div": {
      display: "flex",
      width: 150,
      margin: "0px !important",
    },
    "& span div p": {
      // width: "50px",
      margin: 0,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
  removeButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "-20px",
    right: "-40px",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
    },
  },
  removeIcon: {
    fontSize: 30,
    // cursor: "pointer",
  },
  popup: {
    position: "absolute",
    boxShadow: theme.custom.mainBoxShadow,
    display: "flex",
    zIndex: 1000,
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 10px 10px 10px",
    outline: "none",
    width: 300,
    right: "-70px",
    top: "-10px",
    minHeight: 30,
    "& > div": {
      padding: "3px 0 3px 10px",
      fontWeight: "500",
      border: "1px solid #ffffff",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#e5e0e0",
        borderRadius: theme.custom.mainBorderRadius,
      },
    },
  },
}));

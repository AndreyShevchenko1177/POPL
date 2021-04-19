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
    position: "absolute",
    zIndex: 1,
  },
  wizardContainer: {
    position: "absolute",
    top: "120px",
    left: "calc(50% - 360px)", // half of container width plus half of sidebar width to show in center of viewport
    padding: "15px",
    backgroundColor: "#ffffff",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderForBigElement,
    zIndex: 50,
    outline: "none",
    "@media (max-width:1400px)": {
      left: "calc(50% - 325px)", // half of container width plus half of sidebar width to show in center of viewport
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
    width: 420,
    height: 500,
    overflow: "auto",
    "@media (max-width:1400px)": {
      width: 350,
      height: 400,
    },
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 420,
    height: 500,
    paddingTop: 30,
    "@media (max-width:1400px)": {
      width: 350,
      height: 400,
    },
  },
  linkImageValueContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  secondPageLink: {
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
    padding: "20px 0 20px 0",
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
    fontFamily: "AvenirNextCyr, san-serif, arial",
  },
  btnContainer: {
    width: "50%",
    paddingBottom: 20,
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
}));

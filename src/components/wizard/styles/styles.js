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
    backgroundColor: "gray",
    opacity: "0.45",
    position: "absolute",
    zIndex: 1,
  },
  wizardContainer: {
    position: "absolute",
    top: "120px",
    left: "calc(50% - 340px)", // half of container width plus half of sidebar width to show in center of viewport
    padding: "15px",
    backgroundColor: "#ffffff",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderForBigElement,
    zIndex: 50,
    outline: "none",
    "@media (max-width:1400px)": {
      left: "calc(50% - 305px)", // half of container width plus half of sidebar width to show in center of viewport
    },
  },
  linksContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
  },
  linkValueWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "50px 0 20px 0",
    "@media (max-width:1400px)": {
      padding: "20px 0 20px 0",
    },
  },
  linkValue: {
    width: "70%",
    padding: 10,
    textAlign: "center",
    color: theme.palette.specifyText.main,
    overflowWrap: "break-word",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
    minHeight: 40,
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

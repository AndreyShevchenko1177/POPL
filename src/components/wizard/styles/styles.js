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
    minHeight: "300vh",
    backgroundColor: theme.custom.modalOpacityBackground,
    opacity: theme.custom.modalOpacity,
    position: "absolute",
    zIndex: 1,
  },
  wizardContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // minWidth: 400,
    // maxWidth: 1138,
    minHeight: 500,
    width: 800,
    // left: "calc(50% - 360px)", // half of container width plus half of sidebar width to show in center of viewport
    padding: "15px 15px 25px 15px",
    backgroundColor: "#ffffff",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderForBigElement,
    zIndex: 50,
    outline: "none",
    "@media (max-height:760px)": {
      // left: "calc(50% - 570px)",
      // left: "calc(50% - 325px)", // half of container width plus half of sidebar width to show in center of viewport
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
    height: "100%",
    width: "100%",
    // overflow: "auto",
    "@media (max-width:1400px)": {
      width: "100%",
    },
    "@media (max-width:1000px)": {
      justifyContent: "center",
    },
  },
  linksSectionContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  linksContainerScreenTwo: {
    display: "flex",
    justifyContent: "center",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 10px",
    backgroundColor: "rgb(170 170 170 / 50%)",
    width: 150,
    height: 150,
    boxShadow: theme.custom.iconBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
    textAlign: "center",
  },
  secondScreenLinkImage: {
    width: "100%",
  },
  linkText: {
    textAlign: "center",
    paddingBottom: 10,
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 10px",
    margin: "10px 10px",
    backgroundColor: "rgb(170 170 170 / 50%)",
    width: 40,
    height: 40,
    boxShadow: theme.custom.iconBoxShadow,
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
  categoryContainer: {
    display: "flex",
    // gridTemplateColumns: "repeat(12, 1fr)",
    // "@media (max-width:1400px)": {
    //   gridTemplateColumns: "repeat(12, 1fr)",
    // },
  },
  categoryLastChild: {
    // "& > div:last-child": {
    //   gridColumn: "span 8",
    //   "@media (max-width:1400px)": {
    //     gridColumn: "span 3",
    //   },
    // },

  },
  categoryTitleWrapper: {
    textAlign: "center",
    marginTop: 10,
    paddingLeft: "26px",
  },
  categoryTitle: {
    fontSize: 20,
  },
}));

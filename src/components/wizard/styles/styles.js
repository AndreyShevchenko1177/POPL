import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.custom.mainBorderForBigElement,
  },
  wizardContainer: {
    position: "absolute",
    top: "30%",
    left: "40%",
    padding: "15px",
    backgroundColor: "#ffffff",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderForBigElement,
    zIndex: 50,
    outline: "none",
  },
  linksContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: 350,
    maxHeight: 400,
    overflow: "auto",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    width: 350,
    maxHeight: 400,
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
  linkValue: {
    maxWidth: 200,
    padding: 10,
    textAlign: "center",
    color: theme.palette.specifyText.main,
    overflowWrap: "break-word",
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
    minHeight: 40,
    marginBottom: 20,
  },
  btnContainer: {
    marginBottom: 20,
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

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  drawer: {
    width: theme.custom.drawerWidth,
    flexShrink: 0,
    position: "relative",
  },
  drawerPaper: {
    width: theme.custom.drawerWidth,
  },
  nested: {
    padding: "2px 0 2px 110px",
    borderLeft: "3px solid transparent",
    color: "#ffffff",
    "&:hover": {
      boxShadow: "6px 0px 3px -5px #d7d7d7 inset",
      "-webkit-box-shadow": "6px 0px 3px -5px #d7d7d7 inset",
      "-moz-box-shadow": "6px 0px 3px -5px #d7d7d7  inset",
      borderLeft: "3px solid #dadada",
      borderImage:
        "linear-gradient(to left top,#a1a1a1 50%, #dadada 100%) 1 100%",
      "border-image-slice": 1,
    },
  },
  brand: {
    padding: "30px 0px 50px 0px",
    width: "100%",
    textAlign: "center",
    margin: 0,
    background: "transparent",
    "@media (max-height:900px)": {
      padding: "30px 0px 30px 0px",
    },
  },
  sideBarIcons: {
    width: "20px",
    height: "20px",
  },
  ulMenu: { paddingTop: "0px" },
  ulList: {
    paddingLeft: "45px",
    height: "55px",
    background: "transparent",
    borderLeft: "3px solid transparent",
    color: "#f9f9f9",
    "&:hover": {
      boxShadow: "6px 0px 3px -5px #d7d7d7 inset",
      "-webkit-box-shadow": "6px 0px 3px -5px #d7d7d7 inset",
      "-moz-box-shadow": "6px 0px 3px -5px #d7d7d7  inset",
      borderLeft: "3px solid #dadada",
      background: "#0b0b0b",
      borderImage:
        "linear-gradient(to left top,#a1a1a1 50%, #dadada 100%) 1 100%",
      "border-image-slice": 1,
      "& > *": {
        color: "#fff",
      },
      "& > svg path": {
        fill: "#fff",
      },
      "& > div div svg path ": {
        fill: "#fff",
      },
    },
  },
  ulListHighLight: {
    backgroundColor: "#f9f9f9",
  },
  listText: {
    fontFamily: "AvenirNextCyr",
    fontSize: "16px",
    letterSpacing: "1.5px",
    color: "#f9f9f9",
  },
  listTextNested: {
    fontFamily: "AvenirNextCyr",
    fontSize: "14px",
    letterSpacing: "1.5px",
    color: "#f9f9f9",
  },
  listTextHighLight: {
    color: "#3a3a3a",
  },
  listItemIcon: {
    minWidth: "40px",
  },
  sideBarHelpCenterContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    height: "130px",
    bottom: "50px",
    width: "100%",
    padding: "20px 20px 0 45px",
    "@media (max-height:900px)": {
      bottom: "15px",
      paddingTop: "5px",
      position: "static",
    },
  },
  tierContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tierHeader: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
    "& > span": {
      color: "#ffffff",
      fontFamily: "AvenirNextCyr, san-serif, arial",
      fontSize: "1rem",
      letterSpacing: "1.5px",
    },
  },
  tierIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  networkContainerBarItem: {
    height: "5px",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#73bef2",
  },
  barTrack: {
    position: "relative",
    width: "100%",
    height: "5px",
    backgroundColor: "#efefef",
  },
  tierValue: {
    display: "flex",
    padding: "10px 0",
    "& > span": {
      color: "#ffffff",
      fontFamily: "AvenirNextCyr, san-serif, arial",
      fontSize: "1rem",
    },
  },
  tierButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "60%",
  },
}));

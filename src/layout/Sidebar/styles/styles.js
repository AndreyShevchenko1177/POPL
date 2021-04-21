import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  drawer: {
    width: theme.custom.drawerWidth,
    flexShrink: 0,
    position: "relative",
  },
  drawerPaper: {
    width: theme.custom.drawerWidth,
    minHeight: 700,
    overflowY: "auto",
  },
  logo: {
    width: 80,
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
      background: "#9b9595",
      borderImage:
        "linear-gradient(to left top,#a1a1a1 50%, #dadada 100%) 1 100%",
      "border-image-slice": 1,
      "& > *": {
        color: "#fff",
      },
    },
  },
  brand: {
    padding: "30px 0px 30px 0px",
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
    "& .white": {
      display: "none",
    },
    "& .dark": {
      display: "inline-block",
    },
    "&:hover": {
      "& .white": {
        display: "inline-block",
      },
      "& .dark": {
        display: "none",
      },
      boxShadow: "6px 0px 3px -5px #d7d7d7 inset",
      "-webkit-box-shadow": "6px 0px 3px -5px #d7d7d7 inset",
      "-moz-box-shadow": "6px 0px 3px -5px #d7d7d7  inset",
      borderLeft: "3px solid #dadada",
      background: "#9b9595",
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
    backgroundColor: "#e0dede",
  },
  listText: {
    fontSize: "14px",
    letterSpacing: "1.5px",
    color: "#000000",
  },
  listTextNested: {
    fontSize: "12px",
    letterSpacing: "1.5px",
    color: "#7d8286",
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
    "@media (max-height:700px)": {
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
      color: "#000000",
      fontSize: "14px",
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
      color: "#000000",
      fontSize: "14px",
    },
  },
  tierLevelButtonWrapper: {
    position: "relative",
    width: "60%",
    height: 36,
  },
  tierButton: {
    color: "#000000",
    borderColor: "#7d8286",
    // width: "60%",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  longPressButton: {
    position: "absolute",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
}));

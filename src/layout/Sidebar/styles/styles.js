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
    height: 40,
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
    display: "flex",
    padding: "30px 0px 30px 50px",
    width: "100%",
    textAlign: "center",
    margin: 0,
    background: "transparent",
    "@media (max-height:900px)": {
      padding: "30px 0px 30px 50px",
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
      backgroundColor: "#9b9595",
      background: "linear-gradient(to right, rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100%)",
      borderRadius: "0 5px 5px 0",
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
    background: "linear-gradient(to right, rgba(255,255,255,0) 70%,rgba(255,255,255,1) 100%)",
    borderRadius: "0 5px 5px 0",
  },
  listText: {
    fontSize: "14px",
    letterSpacing: 0,
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
    "@media (max-height:750px)": {
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  profileName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileCircle: {
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
  settingsContainer: {
    padding: "20px 20px 10px 0px",
    cursor: "pointer",
    "&:hover": {
      borderBottom: "1px solid #9b9595",
      padding: "20px 20px 9px 0px",
    },
  },
  settingsText: {
    color: "#000000",
    fontSize: 14,
    letterSpacing: 0,
  },
}));

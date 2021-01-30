import { makeStyles } from "@material-ui/core";

const drawerWidth = 260;

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "relative",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
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
    padding: "30px 0px 100px 0px",
    width: "100%",
    textAlign: "center",
    margin: 0,
    background: "transparent",
    "@media (max-height:900px)": {
      padding: "30px 0px 50px 0px",
    },
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
  listTextHighLight: {
    color: "#3a3a3a",
    fontFamily: "AvenirNextCyr",
    fontSize: "16px",
    letterSpacing: "1.5px",
  },
  listItemIcon: {
    minWidth: "40px",
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  rootContainer: {
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
  },
  gridItem: {
    padding: "8px 0px !important",
  },
  section: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
  },
  adornment: {
    borderRadius: 4,
  },
  saveBtn: {
    padding: "8px 16px",
    width: "150px",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
  newProfileHeaderContainer: {
    paddingLeft: "50px",
  },
  emailBtn: {
    padding: "10px 30px",
    minWidth: "150px",
    height: 50,
  },
  emailContainer: {
    display: "flex",
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: theme.custom.mainBorderRadius,
    width: "100%",
  },
  emailInput: {
    outline: "none",
    border: "none",
    // color: theme.custom.mainBorderGreyColor,
    height: 19,
    margin: "8px 13px 13px 5px",
  },
  emailsComponentWrapper: {
    position: "relative",
    minHeight: "200px",
  },
  emailChipContainer: {
    width: "100%",
    minHeight: "100px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 10,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "30px 0 0 0",
  },
  emailChip: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    height: 35,
    margin: "0px 5px 5px 0px",
    padding: "7px 10px",
    borderRadius: "20px",
    "& p": {
      paddingRight: 5,
    },
  },
  icon: {
    cursor: "pointer",
    fill: "rgba(0, 0, 0, 0.26)",
  },
  importPreviewContainer: {
    display: "flex",
    alignItems: "center",
    "& > button:first-child": {
      marginRight: 20,
    },
  },
  preview: {
    display: "flex",
    padding: "0 20px",
    alignItems: "center",
  },
  previewItem: {
    width: 100,
    height: 110,
    marginRight: 10,
    overflow: "hidden",
    display: "flex",

  },
  dropZoneWrapper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px",
    top: 0,
    zIndex: 1000,
    left: "50%",
    transform: "translateX(-50%)",
  },
  dropZoneContainer: {
    position: "relative",
    minWidth: "500px",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start !important",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
    margin: 0,
    "& > input": {
      display: "none",
    },
  },
  opacityBackground: {
    top: "-210px",
    left: "-64px",
    width: "calc(100% + 128px)",
    minHeight: "100vh",
    backgroundColor: "gray",
    opacity: "0.45",
    position: "absolute",
    zIndex: 1,
  },
  dropZoneIconContainer: {
    width: 90,
    height: 90,
    padding: 10,
  },
}));

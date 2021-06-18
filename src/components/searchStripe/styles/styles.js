import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "5px 16px",
    display: "flex",
    alignItems: "center",
    marginLeft: 30,
    width: "100%",
    height: 40,
    borderRadius: theme.custom.mainBorderRadius,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    "@media (max-width:1000px)": {
      marginLeft: 15,
    },
  },
  containerWrapper: {
    position: "sticky",
    top: 70,
    zIndex: 999,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    position: "relative",
    width: "100%",
    height: 60,
    justifyContent: "space-between",
  },
  buttonWrapper: {
    position: "relative",
    marginLeft: 15,
    borderRadius: theme.custom.mainBorderRadius,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    height: 40,
    "@media (max-width:1000px)": {
      marginLeft: 15,
    },
  },
  button: {
    height: 40,
    minWidth: 165,
    fontSize: "14px",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    fontSize: "15px",
    flex: 1,
  },
  checkbox: {
    height: 40,
    width: 50,
    backgroundColor: theme.palette.background.paper,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    padding: "0px 6px",
    borderRadius: theme.custom.mainBorderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",

    // marginRight: 12,
  },
  showAllButton: {
    minWidth: "100px",
    marginLeft: 15,
    "@media (max-width:1000px)": {
      marginLeft: 15,
    },
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
  actionButton: {
    height: "40px",
    minWidth: "100px",
    fontSize: "14px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  sortText: {
    position: "absolute",
    fontSize: 15,
    color: "#666666",
    fontWeight: "200",
    width: "150px",
    height: 25,
    display: "flex",
    alignItems: "center",
    bottom: "-30px",
    left: "5px",
    paddingTop: 5,
  },
}));

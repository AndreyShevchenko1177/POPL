import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    marginLeft: 30,
    width: "100%",
    borderRadius: theme.custom.mainBorderRadius,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    "@media (max-width:1000px)": {
      marginLeft: 15,
    },
  },
  searchContainer: {
    display: "flex",
    position: "relative",
    width: "100%",
    height: "100px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    position: "relative",
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
    marginLeft: 30,
    "@media (max-width:1000px)": {
      marginLeft: 15,
    },
  },
  button: {
    height: "50px",
    minWidth: "160px",
    fontSize: "16px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    fontSize: "15px",
    flex: 1,
  },
  checkbox: {
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
    marginLeft: 30,
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
    height: "50px",
    minWidth: "100px",
    fontSize: "16px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  sortText: {
    position: "absolute",
    width: "150px",
    display: "flex",
    alignItems: "center",
    bottom: "-30px",
    left: "5px",
  },
}));

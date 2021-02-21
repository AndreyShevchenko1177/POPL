import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    margin: "0px 30px",
    width: "100%",
    borderRadius: theme.custom.mainBorderRadius,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    "@media (max-width:1000px)": {
      margin: "0 15px",
    },
  },
  searchContainer: {
    display: "flex",
    width: "100%",
    height: "100px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
  },
  button: {
    height: "50px",
    minWidth: "150px",
    fontFamily: "AvenirNextCyr",
    fontSize: "13px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    fontFamily: "AvenirNextCyr",
    fontSize: "15px",
    flex: 1,
  },
  checkbox: {
    backgroundColor: theme.palette.background.paper,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    padding: "12px 12px",
    borderRadius: theme.custom.mainBorderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    // marginRight: 12,
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    margin: "0px 30px",
    width: "100%",
    borderRadius: 8,
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
    borderRadius: 4,
    padding: "0 30px",
    "@media (max-width:1000px)": {
      padding: "0 10px",
    },
  },
  button: {
    height: "50px",
    minWidth: "150px",
    fontFamily: "AvenirNextCyr",
    fontSize: "13px",
    borderRadius: 8,
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    fontFamily: "AvenirNextCyr",
    fontSize: "15px",
    flex: 1,
  },
  checkbox: {
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    padding: "12px 12px",
    borderRadius: 8,
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

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    margin: "0px 30px",
    width: "100%",
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
    backgroundColor: "#f1f1f1",
    borderRadius: 4,
    padding: "0 30px",
    "@media (max-width:1000px)": {
      padding: "0 10px",
    },
  },
  button: {
    height: "50px",
    minWidth: "150px",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  checkbox: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: "12px 12px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    //marginRight: 12,
  },
  toolbar: theme.mixins.toolbar,
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
}));

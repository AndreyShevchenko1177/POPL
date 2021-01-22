import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    //margin: "0px 16px",
  },
  searchContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  button: {
    height: "50px",
    marginRight: "10px",
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
}));

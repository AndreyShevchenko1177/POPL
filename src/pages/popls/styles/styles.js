import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    minWidth: "100%",
    margin: "0px 16px",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  checkbox: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: "3px 12px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: 12,
  },
  button: {
    borderRadius: 4,
    height: "100%",
    padding: "12px 16px",
  },
  toolbar: theme.mixins.toolbar,
}));

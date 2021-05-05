import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  listItemContainer: {
    marginTop: 10,
    maxHeight: "250px",
    overflow: "auto",
  },
  listItem: {
    padding: "10px 10px",
    "&:hover": {
      backgroundColor: "#efefef",
      cursor: "pointer",
    },
  },
  outlinedInput: {
    height: 40,
  },
}));

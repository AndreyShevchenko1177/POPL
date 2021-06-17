import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  listItemContainer: {
    marginTop: 10,
    maxHeight: "250px",
    overflow: "auto",
  },
  nothingFound: {
    padding: "5px 10px",
    fontSize: 18,
  },
  listItem: {
    padding: "10px 10px",
    "&:hover": {
      backgroundColor: "#efefef",
      cursor: "pointer",
    },
  },
  activeListItem: {
    backgroundColor: "#efefef",
  },
  outlinedInput: {
    height: 40,
  },
  dataWrapper: {
    display: "flex",
    alignItems: "center",
  },
  labelContainer: {
    height: 40,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
  },
}));

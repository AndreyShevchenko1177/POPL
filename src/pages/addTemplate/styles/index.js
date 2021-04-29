import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    padding: "100px 40px 0 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tempNameInputWrapper: {
    width: 300,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  contentWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  contentSideContainer: {
    width: "48%",
    maxWidth: 400,
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&:first-child": {
      marginRight: 50,
    },
  },
  itemWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  fieldTitle: {
    fontWeight: "bold !important",
    paddingBottom: 10,
  },
  addLinkButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#acacac",
    fontSize: "1rem",
    height: 30,
    width: "70%",
    border: "none",
    cursor: "pointer",
    borderRadius: 10,
    "& input": {
      display: "none",
    },
  },
}));

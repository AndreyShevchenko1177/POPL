import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    maxWidth: 450,
    width: "100%",
    padding: 20,
  },
  emailContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  label: {
    fontWeight: "700",
    fontSize: 12,
    paddingBottom: 10,
  },
}));

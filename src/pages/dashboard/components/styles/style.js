import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: "300px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: "10px",
  },
  header_icon: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "0.5px solid grey",
    paddingBottom: "10px",
  },
  userIcon: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
  },
  header_body: {
    padding: "10px",
  },
  footer: {
    padding: "20px 10px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#8b848924",
  },
  button: {
    height: "40px",
    width: "45%",
    fontFamily: "AvenirNextCyr",
    fontSize: "13px",
  },
}));

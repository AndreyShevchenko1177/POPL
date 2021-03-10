import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    padding: "10px",
    width: "400px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  buttonsConatiner: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    width: "200px",
    bottom: "5px",
  },
  inputs: {
    margin: "10px 0",
  },
}));

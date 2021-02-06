import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  dragDotsRight: {
    display: "flex",
    cursor: "move",
    flexDirection: "column",
    position: "absolute",
    width: "17px",
    height: "14px",
    justifyContent: "space-evenly",
    top: "10px",
    right: "10px",
  },
  dragDotsCenter: {
    display: "flex",
    cursor: "move",
    flexDirection: "column",
    position: "absolute",
    width: "17px",
    height: "14px",
    justifyContent: "space-evenly",
    top: "10px",
    left: "50%",
  },
  dragDotsLeft: {
    display: "flex",
    cursor: "move",
    flexDirection: "column",
    position: "absolute",
    width: "17px",
    height: "14px",
    justifyContent: "space-evenly",
    top: "10px",
    left: "10px",
  },
  dots_container: {
    display: "flex",
    justifyContent: "space-around",
  },
  dot: {
    width: "3px",
    height: "3px",
    backgroundColor: "#8f8f8f",
    borderRadius: "3px",
  },
}));

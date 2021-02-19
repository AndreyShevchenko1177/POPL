import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  icon: {
    fontSize: "16px",
    marginRight: "3px",
  },
  titleText: {
    color: "#808080",
  },
  percentage: {
    fontWeight: "bold",
    marginRight: "5px",
  },
  colorGreen: {
    color: "#95d6c9",
  },
  colorRed: {
    color: "#d74e43",
  },
  topArrowIcon: {
    color: "#95d6c9",
    position: "absolute",
    top: 0,
    left: "-10px",
  },
  downArrowIcon: {
    color: "#d74e43",
    position: "absolute",
    top: 0,
    left: "-10px",
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  "network-container": {
    padding: "50px 25px 0px 25px",
  },
  "network-container__header": {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 15px",
    boxShadow: "0px 0px 10px 10px rgba(240,240,240,0.54)",
    borderBottom: "1px solid #a5a4a4",
  },
  "network-container__title": {
    display: "flex",
    minWidth: "240px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "network-container__charts": {
    display: "flex",
    padding: "10px 10px",
    boxShadow: "0px 0px 10px 10px rgba(240,240,240,0.54)",
  },
  "network-container__line": {
    position: "relative",
    width: "65%",
  },
  "network-container__bar": {
    position: "relative",
    padding: "15px",
    width: "35%",
  },
  "network-container__bar-item-container": {
    position: "relative",
    paddingBottom: "20px",
  },
  "network-container__header-text": {
    padding: "10px 0px",
    borderBottom: "1px solid #eaebed",
  },
  "network-container__bar-wrapper": {
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
  },
  "network-container__bar-item": {
    height: "12px",
    position: "absolute",
    boxShadow: "0px 0px 10px 10px rgba(240,240,240,0.54)",
    top: "30px",
    backgroundColor: "#59b99e",
  },
  text: {
    color: "#6f829a",
  },
  barText: {
    color: "#6f829a",
    fontSize: "1.25rem !important",
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "10px 20px 30px 40px",
    borderRadius: 10,
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
  },
  head: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  itemBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 15px",
  },
  headItem: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  applicationList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  applicationBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  applicationBtn: {
    margin: "0px 6px",
  },
  directOfBbtn: {
    border: "2px solid black",
    borderRadius: 6,
    padding: "4px 20px",
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    margin: "0 18px",
    width: "120px",
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  description: {
    display: "flex",
    margin: "0px 0 15px",
  },
  para: {
    color: "#656565",
    fontSize: 14,
    width: "70%",
    margin: "0px 8px",
  },
  dragIcon: {
    color: "#d8dbe0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
    top: "-22px",
    transform: "translateX(-50%)rotate(90deg)",
  },
  viewMoreLink: {
    textAlign: "right",
    display: "flex",
    alignItems: "center",
  },
}));

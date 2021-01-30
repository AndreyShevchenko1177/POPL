import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "50px 20px 30px 40px",
    borderRadius: 4,
    width: "100%",
  },
  container: {
    display: "flex",
    position: "relative",
    marginTop: 20,
    width: "100%",
    "-webkit-box-shadow": "0px 0px 10px 10px rgba(240,240,240,0.54)",
    boxShadow: "0px 0px 10px 10px rgba(240,240,240,0.54)",
  },
  dragDotsRight: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "17px",
    height: "14px",
    justifyContent: "space-evenly",
    top: "10px",
    right: "10px",
  },
  dragDotsLeft: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "17px",
    height: "14px",
    justifyContent: "space-evenly",
    top: "10px",
    left: "10px",
  },
  dot: {
    width: "3px",
    height: "3px",
    backgroundColor: "#8f8f8f",
    borderRadius: "3px",
  },
  dots_container: {
    display: "flex",
    justifyContent: "space-around",
  },
  section1: {
    display: "flex",
    flexDirection: "column",
    paddingRight: "20px",
  },
  section1_title: {
    paddingBottom: "50px",
  },
  section1_avatar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    width: "100%",
  },
  section2: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "35px",
  },
  section2_icon: {
    backgroundColor: "#f1f4f6",
    marginRight: "5px",
    width: "32px",
    height: "32px",
  },
  section3: {
    paddingBottom: "35px",
  },
  section3_text: {
    color: "#666666",
    fontSize: 14,
    fontFamily: "AvenirNextCyr",
  },
  section4: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "35px",
    flexWrap: "wrap",
  },
  section5: {
    display: "flex",
    justifyContent: "flex-end",
    fontWeight: "700",
    color: "#4f4f4f",
  },
  iconItem: {
    width: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

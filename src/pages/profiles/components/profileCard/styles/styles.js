import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "0",
    minHeight: "150px",
    width: "100%",
    borderRadius: theme.custom.mainBorderForBigElement,
  },
  rootBusinessModeBackground: {
    backgroundColor: "#f3f5f3",
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
    width: "20%",
    minWidth: "180px",
    alignItems: "flex-start",
    paddingTop: "35px",
  },
  section1_title: {
    display: "flex",
    justifyContent: "flex-start",
  },
  section1_avatar: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: "35px 0 20px 0",
  },
  section2: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  section2_icon: {
    backgroundColor: "#f1f4f6",
    marginRight: "5px",
    width: "32px",
    height: "32px",
  },
  section3: {
    minHeight: "100px",
    padding: "15px 5px 20px 0px",
  },
  section3_text: {
    color: "#666666",
    fontSize: 18,
    fontFamily: "AvenirNextCyr",
  },
  section4: {
    width: "100%",
    display: "flex",
    paddingRight: "10px",
  },
  section4_sub_wrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "45%",
  },
  section5: {
    display: "flex",
    flexDirection: "column",
    padding: "25px 35px 25px 35px",
    backgroundColor: "#e8ede8",
    borderTopRightRadius: theme.custom.mainBorderForBigElement,
    borderBottomRightRadius: theme.custom.mainBorderForBigElement,
  },
  iconItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: "15px",
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    marginRight: 15,
  },
  buttonsContainer: {
    display: "flex",
    height: "100%",
    width: "125px",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  section6: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "20px",
  },
  connectIcon: {
    width: "15px",
    height: "15px",
  },
}));

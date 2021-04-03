import { makeStyles } from "@material-ui/core";

export default (isSafari) => makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "0",
    minHeight: "150px",
    maxHeight: 200,
    width: "100%",
    borderRadius: theme.custom.mainBorderForBigElement,
    outline: "none",
  },
  rootBusinessModeBackground: {
    backgroundColor: "#f3f5f3",
  },
  rootProfileOffBackground: {
    backgroundColor: "#b3b1b1",
  },
  container: {
    display: "flex",
    position: "relative",
    marginTop: 20,
    width: "100%",
    "-webkit-box-shadow": "0px 0px 10px 10px rgba(240,240,240,0.54)",
    boxShadow: "0px 0px 10px 10px rgba(240,240,240,0.54)",
    outline: "none",
  },
  mainContent: {
    position: "relative",
    width: "100%",
    outline: "none",
  },
  profileOff: {
    position: "absolute",
    top: "10px",
    left: "10px",
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
    width: "100%",
    maxHeight: "140px",
    minWidth: "180px",
    alignItems: "flex-start",
    padding: "20px 0 10px 0",
  },
  section1_title: {
    display: "flex",
    justifyContent: "flex-start",
  },
  section1_avatar: {
    width: "200px",
    margin: "0 20px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    width: "100%",
    minWidth: "700px",
    height: "85px",
    padding: "0 30px 0 60px",
  },
  section2: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  section2_icon: {
    backgroundColor: "#f1f4f6",
    marginRight: "5px",
    width: "32px",
    height: "32px",
  },
  section3: {
    // overflow: "hidden",
    padding: "15px 5px 20px 0px",
  },
  section3_text: {
    color: "#666666",
    maxHeight: "78px",
    overflow: "hidden",
    fontSize: 18,
  },
  section4: {
    width: "100%",
    display: "flex",
    paddingRight: "10px",
    alignItems: "flex-end",
  },
  section4_sub_wrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "45%",
  },
  section5: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px 0",
    minWidth: 230,
    background: theme.overrides.MuiDrawer.paper.backgroundColor,
    // backgroundImage:
    //       "linear-gradient(110deg, rgba(58,58,58,1) 3%, rgba(11,11,11,1) 50%, rgba(0,0,0,1) 80%)",
    borderTopRightRadius: theme.custom.mainBorderForBigElement,
    borderBottomRightRadius: theme.custom.mainBorderForBigElement,
  },
  linkClicksWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 15px 15px 0",
  },
  iconItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.iconBoxShadow,
    width: 40,
    height: 40,
    // "@media (max-width:1450px)": {
    //   width: 40,
    //   height: 40,
    // },
  },
  linkImage: {
    width: 30,
    // "@media (max-width:1450px)": {
    //   width: 40,
    // },
  },
  clicksText: {
    paddingTop: 10,
    fontFamily: "AvenirNextCyr, san-serif, arial",
    "@media (max-width:1450px)": {
      fontSize: "12px",
    },
  },
  buttonsContainer: {
    display: "flex",
    height: "100%",
    width: "140px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  section6: {
    display: "flex",
    position: "absolute",
    bottom: 5,
    right: 0,
    justifyContent: "flex-end",
    width: "150px",
    height: "30px",
    paddingRight: "20px",
  },
  connectIcon: {
    width: "15px",
    height: "15px",
  },
  switcherContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    "& > div": {
      width: "100%",
    },
  },
  switchLabelWrapper: {
    width: "100%",
    border: "1px solid #ffffff",
    borderRadius: theme.custom.mainBorderRadius,
    padding: "5px 10px",
  },
  switchLabel: {
    color: "#ffffff",
    textAlign: "center",
  },
  button: {
    display: "flex",
    justifyContent: "flex-start",
    height: "20px !important",
    color: "#000000",
    borderRadius: 5,
    fontWeight: 400,
    "& div": {
      fontSize: "12px !important",
      color: "#7d8286",
    },
    "& > span" : {
      position: isSafari ? 'absolute' : 'relative'
    }
  },
  buttonStaistics: {
    marginLeft: "auto",
  },
  buttonStaisticsSafari: {
    marginLeft: 12,
  },
  buttonStaisticsSafariForPopls: {
    marginLeft: 55
  }
}));

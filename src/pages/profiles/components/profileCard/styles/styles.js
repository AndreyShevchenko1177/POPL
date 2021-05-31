import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
    position: "relative",
    width: "100%",
    maxHeight: "140px",
    minWidth: "180px",
    alignItems: "flex-start",
    padding: "20px 0 0px 0",
  },
  section1_editIcon: {
    position: "absolute",
    right: 10,
  },
  section1_title: {
    height: 29,
    display: "flex",
    justifyContent: "flex-start",
  },
  checkMarkWrapper: {
    position: "relative",
  },
  comfirmCheckmark: {
    position: "absolute",
    left: "-20px",
    cursor: "pointer",
  },
  disabledTextfield: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#000000", // (default alpha is 0.38)
      fontWeight: "600",
    },
  },
  disabledTextfieldBio: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#000000", // (default alpha is 0.38)
      fontWeight: "200",
    },
  },
  nameInput: {
    fontSize: 18,
    fontFamily: "DM Sans",
    fontWeight: 600,
    // paddingRight: 20,
  },
  bioInput: {
    fontSize: 14,
    fontFamily: "DM Sans",
    fontWeight: 200,
    color: "#909090",
  },
  emailInput: {
    ontSize: 14,
    fontFamily: "DM Sans",
    fontWeight: 200,
    color: "#5f5f5f !important",
    padding: 0,
  },
  section1_avatar: {
    position: "relative",
    margin: "0 27px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: 129,
    height: 80,
  },
  chipButton: {
    backgroundColor: "transparent !important",
    position: "absolute",
    paddingRight: "10px !important",
    width: "30px",
    height: "30px !important",
    top: "-9px",
    right: "-10px",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  checkboxWrapper: {
    position: "absolute",
    // bottom: "-30px",
    top: 57,
    left: "-15px",
  },
  wrapper: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between",
    width: "100%",
    // minWidth: "700px",
    alignItems: "center",
    padding: "0 30px 0 79px",
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
  bioFieldWrapper: {
    position: "relative",
    display: "flex",
  },
  section3: {
    // display: "flex",
    minHeight: 49,
    position: "relative",
    padding: "0px 5px 0px 0px",
  },
  section3_text: {
    color: "#666666",
    maxHeight: "78px",
    overflow: "hidden",
    fontSize: 18,
  },
  section4: {
    maxWidth: 550,
    overflow: "auto",
    paddingLeft: 7,
    height: 75,
    position: "relative",
    display: "flex",
    paddingRight: "10px",
    alignItems: "center",
    "@media (max-width:1450px)": {
      maxWidth: 400,
    },
    "@media (max-width:1250px)": {
      maxWidth: 302,
    },
  },
  addLinkIcon: {
    position: "absolute !important",
    right: "-68px",
    top: 10,
    cursor: "pointer",
  },
  linksBackBtn: {
    position: "absolute !important",
    top: 20,
    left: "-45px",
    cursor: "pointer",
  },
  linksNextBtn: {
    position: "absolute !important",
    top: 20,
    cursor: "pointer",
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
    width: 35,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 15px 15px 0",
    "& > span": {
      position: "absolute",
      fontSize: 10,
      bottom: "-20px",
      whiteSpace: "nowrap",
    },
  },
  linksEditWrapper: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#d8d5d5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -7,
    right: -7,
    cursor: "pointer",
    zIndex: 10000,
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
    cursor: "pointer",
  },
  linkImage: {
    transform: "scale(1, 1)",
    width: 30,
    height: 30,
  },
  clicksText: {
    paddingTop: 10,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    bottom: 10,
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
  },
  buttonRelative: {
    "& > span": {
      position: "relative",
    },
  },
  buttonAbsolute: {
    "& > span": {
      position: "absolute",
    },
  },
  buttonStaistics: {
    marginLeft: "auto",
    "& > span": {
      position: "relative",
    },
  },
  buttonStaisticsSafari: {
    marginLeft: 12,
  },
  buttonStaisticsSafariForPopls: {
    marginLeft: 55,
  },
  safariLinks: {
    margin: "0px 15px 35px 0px",
  },
  bioNotEditMode: {
    height: 40,
    fontSize: 14,
    overflow: "hidden",
  },
  start_wiggle: {
    animation: "0.12s linear 0s infinite alternate none running $myfirst",
    "-webkitAnimation": "0.12s linear 0s infinite alternate none running $myfirst",
  },
  "@keyframes myfirst": {
    "0%": {
      transform: "scale(1, 1) rotate(3.5deg)",
    },
    "100%": {
      transform: "scale(1, 1) rotate(-3.5deg)",
    },
  },
  "@webkitKeyframes myfirst": {
    "0%": {
      webkitTransform: "scale(1, 1) rotate(3.5deg)",
    },
    "100%": {
      webkitTransform: "scale(1, 1) rotate(-3.5deg)",
    },
  },
}));

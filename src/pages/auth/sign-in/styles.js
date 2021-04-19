import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  topIconContainer: {
    position: "absolute",
    top: "27px",
    left: "33px",
  },
  logo: {
    width: 70,
    height: "auto",
  },
  animationContainer: {
    display: "none",
    overflow: "hidden",
    width: "64%",
    height: "100vh",
    backgroundColor: "#f5f9fa",
    "@media (min-width: 1024px)": {
      display: "flex",
      position: "relative",
    },
  },
  textContainer: {
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    flexDirection: "column",
    alignItems: "center",
  },
  animationContainerHeading: {
    paddingBottom: 10,
  },
  link: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  emailAdornment: {
    padding: 12,
    color: "rgba(0, 0, 0, 0.54);",
  },
  bottomAnimationWrapper: {
    position: "absolute",
    bottom: "-80vh",
    left: "-80vh",
    width: "160vh",
    height: "160vh",
  },
  topAnimationWrapper: {
    position: "absolute",
    top: "-50vh",
    right: "-50vh",
    width: "100vh",
    height: "100vh",
  },
  animationCirclesWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  animationCircle: {
    position: "absolute",
    inset: "0px",
    background: "radial-gradient(at center center, rgb(115 115 115 / 0%) 0%, rgb(73 73 73 / 5%) 40%, rgb(93 90 90 / 20%) 100%)",
    border: "0.5px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "50%",
    transform: "scale(1)",
    opacity: 0,
    animationName: "$circleGrow",
    animationDuration: "6s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  animationDelay_0: {
    animationDelay: "0s",
  },
  animationDelay_2: {
    animationDelay: "2s",
  },
  animationDelay_4: {
    animationDelay: "4s",
  },
  loginContainer: {
    display: "flex",
    padding: "81px 64px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "@media (min-width: 1024px)": {
      width: "36%",
    },
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& > span": {
      fontWeight: "700",
      fontSize: 12,
      paddingBottom: 10,
    },
  },
  loginFormWrapper: {
    maxWidth: "416px",
    minHeight: "60vh",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  loginBtn: { margin: "30px 0" },
  adornment: {
    padding: 12,
    color: "rgba(0,0,0,0.54)",
  },
  "@keyframes circleGrow": {
    "0%": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: 0,
      height: 0,
      opacity: 1,
    },
    "100%": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "100%",
      height: "100%",
      opacity: 0,
    },
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
  },
  donHaveAccButton: {
    display: "flex",
    justifyContent: "center",
    width: "60%",
    minWidth: 230,
  },
  haveAccountLink: {
    fontWeight: "bold !important",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

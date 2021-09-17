import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

  connectionHeaderWrapper: {
    // border: "1px solid red",
    width: "calc(100% + 40px)",
    height: "40px",
    position: "-webkit-sticky", /* Safari */
    position: "sticky",
    top: "0",
    zIndex: "100",
    backgroundColor: "#FFFFFF",
    margin: "0 -20px",

  },

  connectionHeaderContent: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "50px 80px 2fr 3fr 260px 130px 30px",
    alignItems: "center",
    justifyItems: "center",
    gridGap: "15px",
    backdropFilter: "blur(10px)",
    padding: "0 20px",
  },

  titleUser: {
    color: "#828282",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& svg": {
      display: "block",
    },
  },

  titleNote: {
    color: "#828282",
    display: "flex",
    alignItems: "center",
    justifySelf: "start",
    "& svg": {
      display: "block",
    },
  },

  titleConnectedWith: {
    color: "#828282",
    display: "flex",
    alignItems: "center",
    justifySelf: "start",
    "& svg": {
      display: "block",
    },
  },

  tileDate: {
    color: "#828282",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& svg": {
      display: "block",
    },
  },

  transparentSvg: {
    "& svg": {
      opacity: "0.1",
    },
  },

}));

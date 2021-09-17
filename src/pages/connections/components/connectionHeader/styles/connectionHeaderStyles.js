import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

  connectionHeaderWrapper: {
    // border: '1px solid red',
    padding: "20px 50px 20px 50px",
    maxHeight: "75px",
    minHeight: "75px",
  },

  connectionHeaderGrid: {
    minWidth: "980px",
    // border: '1px solid red',
    display: "grid",
    gridTemplateColumns: "1fr 116px 290px 160px",
    alignItems: "center",
    // justifyItems: 'center',
  },

  connectionCounter: {
    // border: '1px solid red',
    fontSize: "20px",
    "& span": {
      color: "#828282",
      fontWeight: "normal",
      fontSize: "16px",
    },
  },

  buttonFilter: {
    border: "1px solid #E0E0E0",
    fontWeight: "500",
    fontSize: "12px",
    borderRadius: "1000px",
    width: "106px",
    height: "40px",
  },

  buttonExportCRM: {
    backgroundColor: "#000000",
    fontWeight: "500",
    fontSize: "12px",
    borderRadius: "1000px",
    width: "160px",
    height: "40px",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#222222",
      // boxShadow: "1px 3px 5px 2px rgba(150, 150, 150, 1)",
    },
    "&:disabled": {
      color: "white",
      backgroundColor: "#7F7F7F",
      // boxShadow: "1px 3px 5px 2px rgba(150, 150, 150, .4)",
    },
  },

  searchField: {
    // border: '1px solid #E0E0E0',
    fontWeight: "normal",
    fontSize: "12px",
    boxSizing: "borderBox",
    borderRadius: "1000px",
    width: "280px",
    height: "40px",
    backgroundColor: "#FFFFFF",
  },

}));

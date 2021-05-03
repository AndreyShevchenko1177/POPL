import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  popupWrapper: {
    position: "absolute",
    display: "flex",
    zIndex: 1000,
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 10px 10px 10px",
    outline: "none",
    width: 100,
    right: 10,
    top: 110,
    minHeight: 30,
    "& > div": {
      padding: "3px 0 3px 10px",
      fontWeight: "500",
      border: "1px solid #ffffff",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#e5e0e0",
        borderRadius: theme.custom.mainBorderRadius,
      },
    },
  },
}));

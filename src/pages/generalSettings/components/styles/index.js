import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  fieldContainer: {
    position: "relative",
    width: 500,
    borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
  },
  paddingWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    padding: "10px 15px",
  },
  fieldTitle: {
    fontWeight: "bold !important",
  },
  colorInputContainer: {
    display: "flex",
    width: "100%",

  },
  colorElement: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#acacac",
    fontSize: "1rem",
    height: 30,
    width: "70%",
    border: "none",
    borderRadius: 10,
    "& input": {
      display: "none",
    },
  },
}));

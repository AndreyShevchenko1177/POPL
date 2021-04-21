import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "10px 15px",
    "& input": {
      display: "none",
    },
    "& > div": {
      display: "flex",
      // alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
  },
  chipButton: {
    backgroundColor: "transparent !important",
    position: "absolute",
    paddingRight: "10px !important",
    width: "30px",
    height: "30px !important",
    top: "-14px",
    right: "-25px",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  dashedContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.custom.mainBorderRadius,
    backgroundColor: "#f3f4f5",
    justifyContent: "center",
    width: "100%",
    // border: `2px dashed ${theme.custom.mainBorderGreyColor}`,
    height: 100,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    height: "120px",
    width: "100%",
    flexWrap: "wrap",
  },
  IconTextWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: 120,
    height: 70,
    borderRadius: "10px",
  },
  fieldTitle: {
    fontWeight: "bold !important",
    paddingBottom: 10,
  },
  uploadImageText: {
    color: "#999a9b",
    fontSize: "20px !important",
    // fontWeight: "bold !important",
  },
}));

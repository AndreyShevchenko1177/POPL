import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "center",
    "& input": {
      display: "none",
    },
    "& > div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
    marginTop: 10,
  },
  chipButton: {
    backgroundColor: "transparent !important",
    position: "absolute",
    paddingRight: "10px !important",
    width: "30px",
    height: "30px !important",
    top: "-14px",
    right: "3px",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  selectLink: {
    fontSize: "18px",
    color: "#3da5f5",
    textDecoration: "underline",
    cursor: "pointer",
  },
  headingDropZoneWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  companyImageWrapper: {
    width: "80px !important",
  },
  dashedContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80px",
    cursor: "pointer",
    border: `2px dashed ${theme.custom.mainBorderGreyColor}`,
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
    width: 80,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
  },
  image: {
    width: 35,
    height: 40,
    objectFit: "cover",
  },
  fieldTitle: {
    fontWeight: "bold !important",
    paddingBottom: 10,
  },
  uploadImageText: {
    color: "#999a9b",
    fontSize: "12px !important",
  },
  fileNameWrapper: {
    width: 80,
  },
  fileNameText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
}));

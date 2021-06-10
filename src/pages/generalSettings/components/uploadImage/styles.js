import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "10px 15px",
    display: "flex",
    minHeight: 138,
    position: "relative",
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
  },
  chipButton: {
    backgroundColor: "transparent !important",
    position: "absolute",
    paddingRight: "10px !important",
    width: "30px",
    height: "30px !important",
    top: "-14px",
    right: "-15px",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  chipButtonEdit: {
    backgroundColor: "transparent !important",
    position: "absolute",
    paddingRight: "10px !important",
    width: "30px",
    height: "30px !important",
    bottom: "-14px",
    right: "-10px",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  headingDropZoneWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  companyImageWrapper: {
    width: "80px !important",
  },
  dashedContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#f3f4f5",
    justifyContent: "center",
    width: "80px",
    height: "80px",
    cursor: "pointer",
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
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
  },
  fieldTitle: {
    fontWeight: "bold !important",
    paddingBottom: 10,
    fontSize: "16px !important",
  },
  uploadImageText: {
    color: "#999a9b",
    fontSize: "12px !important",
  },
}));

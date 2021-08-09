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

    position: "relative",
  },
  companyImageWrapper: {
    width: "80px !important",
    "&:hover": {
      "& > .dialog-popup": {
        display: "block",
      },
    },
  },
  dialogOptions: {
    display: "flex",
    flexDirection: "column",
    "& > div": {
      paddingBottom: 5,
    },
    "& > div:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
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
    "&:hover": {
      "& .dialog-popup": {
        display: "block !important",
      },
    },
  },
  previewContainer: {
    display: "flex",
    position: "relative",
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
    cursor: "pointer",
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
  logoImage: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
  },
  logoImageText: {
    position: "absolute",
    color: "#999a9b",
    fontSize: "7px !important",
    top: 17,
    left: 2,
  },
  logoContainer: {
    position: "absolute",
    cursor: "pointer",
    bottom: "-6px",
    zIndex: 100,
    // backgroundColor: "#ffffff",
    right: "43%",
    "&:hover": {
      "& > .dialog-popup": {
        display: "block",
      },
    },
  },
  logoWrapper: {
    borderRadius: "50%",
    backgroundColor: "rgb(224, 222, 222)",
    width: 30,
    display: "flex",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: 150,
    position: "absolute",
    right: ({ right }) => `${right}px`,
    padding: 10,
    top: ({ top }) => `${top}px`,
    zIndex: 100,
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: 5,
  },
}));

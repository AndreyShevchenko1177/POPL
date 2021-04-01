import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chipButton: {
    backgroundColor: "transparent !important",
    position: "absolute",
    paddingRight: "10px !important",
    // left: '50%',
    // transform: 'translate(-50%, 0)',
    width: "30px",
    height: "30px !important",
    top: "-14px",
    left: "62%",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  dashedContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    border: `2px dashed ${theme.custom.mainBorderGreyColor}`,
    minHeight: 250,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10px",
    height: "120px",
    width: "100%",
    flexWrap: "wrap",
  },
  previewWrapper: {
    display: "flex",
    flexDirection: "column",
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
  imageContainerSmall: {
    width: "70px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
    overflow: "hidden",
  },
  image: {
    marginRight: "25px",
    width: "60px",
    height: "80px",
  },
  dragFilesHeader: {
    padding: 20,
  },
  textInstructionContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 250,
    bottom: "50px",
  },
  maxFileSize: {
    fontSize: "18px !important",
  },
  selectLink: {
    fontSize: "18px",
    color: "#3da5f5",
    textDecoration: "underline",
    cursor: "pointer",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  fileName: {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
    "& > svg": {
      marginLeft: 10,
    },
  },
}));

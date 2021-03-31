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
    top: "-10px",
    left: "52%",
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10px",
    height: "100px",
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
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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

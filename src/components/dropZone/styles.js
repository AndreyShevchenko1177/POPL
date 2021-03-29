import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chipButton: {
    backgroundColor: "transparent",
    position: "absolute",
    paddingRight: "10px",
    // left: '50%',
    // transform: 'translate(-50%, 0)',
    width: "30px",
    height: "30px",
    top: "-10px",
    left: "52%",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10px",
    height: "80px",
    width: "100%",
    flexWrap: "wrap",
  },
  previewWrapper: {
    display: "flex",
    flexDirection: "column",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
    width: 250,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  fileName: {
    paddingTop: 10,
  },
}));

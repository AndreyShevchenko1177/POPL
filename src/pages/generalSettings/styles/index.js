import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    position: "relative",
    paddingTop: 100,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: 500,
    borderRight: `1px solid ${theme.custom.mainBorderGreyColor}`,
  },
  buttonContainer: {
    padding: "10px 15px",
  },
}));

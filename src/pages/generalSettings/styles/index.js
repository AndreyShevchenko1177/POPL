import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    paddingTop: 70,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: 600,
  },
  buttonContainer: {
    padding: "10px 15px",
  },
  onboardFlowTitle: {
    fontSize: "18px !important",
    fontWeight: "bold",
  },
  onboardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

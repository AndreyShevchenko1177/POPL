import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    padding: "100px 40px 20px 40px",
  },
  linksContainer: {
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
  },
  linkIcon: {
    paddingRight: "16px",
  },
}));

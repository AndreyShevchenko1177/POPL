import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
  },
  adornment: {
    borderRadius: 4,
  },
  saveBtn: {
    padding: "8px 16px",
    width: "150px",
  },
}));

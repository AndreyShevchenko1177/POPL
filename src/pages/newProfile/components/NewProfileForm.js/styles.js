import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  rootGrid: {
    border: "1px solid black",
  },
  gridItem: {
    padding: "8px 0px !important",
  },
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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabContainer: {
    display: "flex",
  },
  tabs: {
    minWidth: "350px",
    width: "40%",
  },
  firstElement: {
    width: "50px",
    borderBottom: "1px solid #000",
  },
  secondElement: {
    width: "56%",
    borderBottom: "1px solid #000",
  },
  activeTab: {
    borderBottom: "0px solid #212121",
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000",
  },
  tab1: {
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000",
    borderBottom: "1px solid #000",
    borderRight: "0px solid #000",
  },
  tab2: {
    borderTop: "1px solid #000",
    borderLeft: "0px solid #000",
    borderBottom: "1px solid #000",
    borderRight: "1px solid #000",
  },
  newProfileHeaderContainer: {
    paddingLeft: "50px",
  },
  emailBtn: {
    padding: "10px 30px",
    minWidth: "150px",
  },
}));

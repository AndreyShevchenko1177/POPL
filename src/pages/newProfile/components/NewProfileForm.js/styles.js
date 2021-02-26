import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  rootContainer: {
    borderRadius: theme.custom.mainBorderForBigElement,
    boxShadow: theme.custom.mainBoxShadow,
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
    borderBottom: "1px solid #b2afaf",
  },
  secondElement: {
    width: "56%",
    borderBottom: "1px solid #b2afaf",
  },
  activeTab: {
    borderBottom: "0px solid #212121",
    borderTop: "1px solid #b2afaf",
    borderLeft: "1px solid #b2afaf",
    borderRight: "1px solid #b2afaf",
    borderRadius: `${theme.custom.mainBorderRadius}px ${theme.custom.mainBorderRadius}px 0 0`,
  },
  tab1: {
    borderBottom: "1px solid #b2afaf",
  },
  tab2: {
    borderBottom: "1px solid #b2afaf",
  },
  newProfileHeaderContainer: {
    paddingLeft: "50px",
  },
  emailBtn: {
    padding: "10px 30px",
    minWidth: "150px",
  },
}));

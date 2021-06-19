import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  "network-container": {
    padding: "90px 0 0 0",
  },
  "network-container__header": {
    position: "fixed",
    top: 70,
    zIndex: 1000,
    width: "calc(100% - 350px)",
    display: "flex",
    padding: "10px 15px",
    boxShadow: theme.custom.mainBoxShadow,
    borderBottom: "1px solid #a5a4a4",
    borderRadius: theme.custom.mainBorderRadius,
    marginBottom: "20px",
    backgroundColor: "#ffffff",
  },
  "network-container__title": {
    display: "flex",
    minWidth: "240px",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 50,
  },
  "network-container__charts": {
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
    padding: 10,
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderForBigElement,
    backgroundColor: "#ffffff",
  },
  "network-container__line": {
    position: "relative",
    width: "100%",
    minHeight: 350,
  },
  "network-container__bar": {
    position: "relative",
    padding: "15px",
    width: "35%",
    marginLeft: "auto",
  },
  "network-container__bar-item-container": {
    position: "relative",
    paddingBottom: "25px",
  },
  "network-container__header-text": {
    padding: "15px 0px",
    borderBottom: "1px solid #eaebed",
  },
  "network-container__bar-wrapper": {
    display: "flex",
    flexDirection: "column",
    paddingTop: "15px",
  },
  "network-container__bar-item": {
    height: "12px",
    position: "absolute",
    boxShadow: theme.custom.mainBoxShadow,
    top: "30px",
    backgroundColor: "#59b99e",
  },
  bottomKpisContainer: {
    display: "flex",
    width: "100%",
    minHeight: 80,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomKpisItemContainer: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "200px",
  },
  bottomKpisDivider: {
    borderRight: "2px solid #b3b6b5",
    display: "flex",
    margin: "10px 0",
    "&:last-child": {
      borderRight: "none !important",
    },
  },
  bottomKpisTitleText: {
    fontSize: "14px !important",
  },
  bottomKpisItemValue: {
    fontSize: "1.5rem",
    color: "#000000",
    fontWeight: "bold",
  },
  text: {
    color: "#000000",
    fontSize: 20,
  },
  barText: {
    color: "#6f829a",
    // fontSize: "1.25rem !important",
  },
  noDataText: {
    position: "absolute",
    fontSize: "18px",
    color: "#6f829a",
    top: "40%",
    left: "40%",
    fontWeight: "500",
  },
  lineChartContainer: {
    display: "flex",
    flexDirection: "column",
  },
  filterContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
  },
  buttonWrapper: {
    position: "relative",
    marginLeft: 20,
    "-webkit-box-shadow": theme.custom.mainBoxShadow,
    boxShadow: theme.custom.mainBoxShadow,
    borderRadius: theme.custom.mainBorderRadius,
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
  actionButton: {
    height: "40px",
    minWidth: "100px",
    fontSize: "14px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  filterText: {
    display: "flex",
    alignItems: "center",
    marginRight: 5,
    paddingTop: 5,
  },
}));

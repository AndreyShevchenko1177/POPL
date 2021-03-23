import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  topStatisticsContainer: {
    width: "100%",
    display: "flex",
    marginTop: 80,
    justifyContent: "space-between",
    minWidth: "800px",
  },
  topStatisticsItemsDivider: {
    borderRight: "2px solid #b3b6b5",
    display: "flex",
    margin: "10px 0",
    "&:last-child": {
      borderRight: "none !important",
    },
  },
  topStatisticsItemContainer: {
    width: "16%",
    display: "flex",
    justifyContent: "center",
  },
  topStatisticsItemContentWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  topStatisticsItemTitle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  icon: {
    fontSize: "16px",
    marginRight: "3px",
  },
  titleText: {
    color: "#808080",
  },
  topStatisticsItemValue: {
    fontSize: "2.5rem",
    color: "#6f829a",
    fontWeight: "bold",
    fontFamily: "AvenirNextCyr",
  },
}));

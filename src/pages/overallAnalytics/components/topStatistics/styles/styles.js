import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  topStatisticsWrapper: {
    padding: "10px 5px",
    width: "100%",
    display: "flex",
    minHeight: 100,
    justifyContent: "space-between",
    minWidth: "800px",
    borderRadius: theme.custom.mainBorderRadius,
  },
  topStatisticsContainer: {
    width: "100%",
    marginTop: 80,
    "& > div:first-child": {
      display: "flex",
      marginBottom: 10,
    },

  },
  topStatisticsItemsDivider: {
    borderRight: "2px solid #b3b6b5",
    display: "flex",
    margin: "10px 0",
    "&:last-child": {
      borderRight: "none !important",
    },
  },
  percentageContainer: {
    display: "flex",
    marginLeft: 10,
    alignItems: "center",
  },
  percentageIconWrapper: {
    display: "flex",
    alignItems: "center",
    marginRight: 5,
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
    justifyContent: "center",
  },
  icon: {
    fontSize: "16px",
    marginRight: "3px",
  },
  titleText: {
    color: "#000000",
    marginLeft: 5,
  },
  topStatisticsItemValue: {
    fontSize: "2.5rem",
    color: "#000000",
    fontWeight: "bold",
  },
}));

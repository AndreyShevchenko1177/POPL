import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  topStatisticsWrapper: {
    padding: "15px 5px",
    width: "100%",
    display: "flex",
    minHeight: 112,
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
    marginLeft: 5,
  },
  topStatisticsItemValue: {
    fontSize: "2.5rem",
    color: "#6f829a",
    fontWeight: "bold",
  },
}));

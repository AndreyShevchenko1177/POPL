import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  bottomWidgetsRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "20px",
  },
  twoWidgetsWrapper: {
    display: "flex",
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    // minWidth: 610,
    paddingBottom: 30,
  },
  widgetRoot: {
    position: "relative",
    width: "27%",
    flexGrow: 1,
    minWidth: 300,
    padding: 10,
    marginRight: 30,
    borderRadius: theme.custom.mainBorderRadius,
    "&:last-child": {
      marginRight: 0,
    },
  },
  fullWidgetRoot: {
    position: "relative",
    width: "100%",
    flexGrow: 1,
    minWidth: 300,
    height: 475,
    padding: 10,
    marginRight: 30,
    borderRadius: theme.custom.mainBorderRadius,
    "&:last-child": {
      marginRight: 0,
    },
  },
  widgetChildContainer: {
    height: 400,
    overflow: "auto",
  },
  widgetHeadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
    paddingBottom: 10,
    marginBottom: 10,
  },
  infoIcon: {
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  widgetHeading: {
    whiteSpace: "nowrap",
    fontWeight: "bold",
  },
  layerStringContainer: {
    maxWidth: "50%",
    padding: "0 10px",
    marginLeft: "auto",
  },
  widgetLayerString: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    width: "100%",
    height: 45,
    display: "flex",
    alignItems: "center",
    "&:nth-child(odd)": {
      backgroundColor: "#f6f6f6",
    },
  },
  activeTableRow: {
    backgroundColor: "#787878 !important",
    color: "#ffffff",
  },
  tableCellRank: {
    width: "10%",
    padding: 5,
  },
  tableCellName: {
    display: "flex",
    alignItems: "center",
    padding: 5,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "70%",
    borderBottom: "none",
  },
  topViewedViewsImageContainer: {
    display: "flex",
    alignItems: "center",
    "& > img": {
      width: 25,
      height: 25,
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: 10,
    },
    "& > div": {
      width: 25,
      height: 25,
      borderRadius: "50%",
      boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
      marginRight: 10,
    },
  },
  tableCellNameLink: {
    display: "flex",
    width: "30% !important",
  },
  tableCellValue: {
    padding: 5,
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "none",
    width: "20%",
  },
  tableCellValueLink: {
    width: "55% !important",
    justifyContent: "space-between",
  },
  linkIcon: {
    margin: "0 5px 0 0px",
    cursor: "pointer",
    minWidth: 25,
    width: "20%",
  },
  iconLink: {
    width: 25,
    height: 25,
  },
  linkTapsName: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    paddingRight: 5,
    width: "80%",
  },
  linkLink: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  noDataText: {
    position: "absolute",
    fontSize: "18px",
    color: "#6f829a",
    top: "50%",
    left: "calc(50% - 95px)",
    fontWeight: "500",
  },
  chart: {
    overflow: "hidden",
  },
  popsByProfile: {
    display: "flex",
    justifyContent: "flex-end",
  },
  rootLegend: {
    padding: "15px",
    margin: "10px 10px 10px 0px",

  },
}));

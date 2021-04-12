import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  bottomWidgetsRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 50px",
  },
  twoWidgetsWrapper: {
    display: "flex",
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    minWidth: 610,
    paddingBottom: 30,
  },
  widgetRoot: {
    position: "relative",
    width: "27%",
    flexGrow: 1,
    minWidth: 300,
    maxWidth: 400,
    padding: 10,
    marginRight: 30,
    borderRadius: theme.custom.mainBorderRadius,
    "&:last-child": {
      marginRight: 0,
    },
  },
  widgetChildContainer: {
    height: 230,
    overflow: "auto",
  },
  widgetHeadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
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
  tableCellNameLink: {
    width: "45% !important",
  },
  tableCellValue: {
    padding: 5,
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "none",
    width: "20%",
  },
  tableCellValueLink: {
    width: "40% !important",
    justifyContent: "flex-start",
  },
  linkIcon: {
    margin: "0 5px 0 auto",
    cursor: "pointer",
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
  },
  linkLink: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

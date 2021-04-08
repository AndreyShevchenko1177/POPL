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
    justifyContent: "flex-start",
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
    borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
    paddingBottom: 10,
    marginBottom: 10,
  },
  infoIcon: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  widgetHeading: {
    fontWeight: "bold",
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
  tableCellRank: {
    width: "15%",
    padding: 5,
  },
  tableCellName: {
    display: "flex",
    alignItems: "center",
    padding: 5,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "80%",
    borderBottom: "none",
  },
  tableCellValue: {
    padding: 5,
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "none",
    width: "25%",
  },
  linkIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  linkTapsName: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));

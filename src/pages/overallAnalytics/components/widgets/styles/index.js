import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  bottomWidgetsRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px 50px",
    "@media (max-width: 1600px)": {
      justifyContent: "flex-start",
      flexDirection: "column",
    },
  },
  twoWidgetsWrapper: {
    display: "flex",
    width: "50%",
    flexGrow: 1,
    justifyContent: "space-between",
    minWidth: 610,
    paddingBottom: 10,
    "&:first-child": {
      paddingRight: 5,
    },
    "&:last-child": {
      paddingLeft: 5,
    },
    "@media (max-width: 1600px)": {
      justifyContent: "flex-start",
      "&:last-child": {
        paddingLeft: 0,
      },
      "&:first-child": {
        paddingRight: 0,
      },
      paddingBottom: 30,
      width: "100%",
    },
  },
  widgetRoot: {
    position: "relative",
    width: "45%",
    flexGrow: 1,
    minWidth: 300,
    maxWidth: 400,
    padding: 10,
    borderRadius: theme.custom.mainBorderRadius,
    "&:first-child": {
      marginRight: 10,
    },
    "@media (max-width: 1600px)": {
      "&:first-child": {
        marginRight: 30,
      },
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
  tableRow: {
    "&:nth-child(odd)": {
      backgroundColor: "#f6f6f6",
    },
  },
  tableCell: {
    padding: 5,
    borderBottom: "none",
  },
}));

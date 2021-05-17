import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: 125,
    borderRadius: theme.custom.mainBorderRadius,
    boxShadow: theme.custom.mainBoxShadow,
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.custom.mainBorderForBigElement,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: "10px",
    borderRadius: theme.custom.mainBorderForBigElement,
  },
  header_icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "0.5px solid grey",
    padding: 10,
    height: 140,
  },
  userIcon: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
  },
  header_body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    height: 65,
    width: "100%",
    "& > div": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
  },
  footer: {
    padding: "20px 10px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#8b848924",
  },
  button: {
    height: "40px",
    width: "45%",
    fontSize: "13px",
    borderRadius: 8,
  },
  chartContainer: {
    position: "relative",
    minHeight: "400px",
    width: "100%",
  },
  noDataText: {
    position: "absolute",
    fontSize: "18px",
    color: "#6f829a",
    top: "40%",
    left: "40%",
    fontWeight: "500",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginBottom: 10,
  },
  connectionNameText: {
    fontWeight: "bold !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

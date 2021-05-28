import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: 170,
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
    height: 150,
  },
  userIcon: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
  },
  header_body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    height: 60,
    width: "100%",
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
    height: 300,
    width: "100%",
    "@media (min-height:850px)": {
      height: 350,
    },
    "@media (min-height:900px)": {
      height: 400,
    },
    "@media (min-height:950px)": {
      height: 450,
    },
    "@media (min-height:1000px)": {
      height: 500,
    },
    "@media (min-height:1050px)": {
      height: 550,
    },
    "@media (min-height:1100px)": {
      height: 600,
    },
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
    width: 90,
    height: 90,
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

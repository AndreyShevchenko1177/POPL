import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  connectionsPageContainer: {
    overflow: "auto",
    height: "calc(100vh - 116px)",
    outline: "none",
    padding: " 0px 40px 24px 40px",
  },

  connectionHeaderTitle: {
    width: "100%",
    height: "40px",
    border: "1px solid red",
    position: "relative",
    // width: "calc(100% - 325px)",
    display: "grid",
    gridTemplateColumns: "50px 80px 2fr 3fr 260px 130px 30px",
    alignItems: "center",
    justifyItems: "center",
    gridGap: "15px",
    padding: " 10px 40px 10px 40px",

  },

  DroppableConnectionContainer: {
    display: "flex",
    paddingTop: "15px",
    flexDirection: "column",
    width: "100%",
    outline: "none",
  },
  poplsHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "20px",
    outline: "none",
  },
  poplCard: {
    width: "200px",
    height: "150px",
    marginRight: "10px",
    padding: "5px",
    outline: "none",
  },
  button: {
    height: "50px",
    minWidth: "150px",
    fontSize: "13px",
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
  connectContainer: {
    position: "relative",
    width: "100%",
    height: 84,
    minWidth: 1000,
    margin: "5px 0",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.custom.mainBorderForBigElement,
    outline: "none",
  },
  connectContainerShadow: {
    boxShadow: theme.custom.mainBoxShadow,
  },
  filtersContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 20,
    outline: "none",
  },
  viaconnectBackground: {
    backgroundColor: "#f3f5f3",
  },
}));

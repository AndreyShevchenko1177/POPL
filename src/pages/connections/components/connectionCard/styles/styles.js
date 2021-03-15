import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "160px",
    height: "130px",
    marginLeft: "10px",
    padding: "20px 0",
  },
  avatar: {
    width: "120px",
    height: "70px",
    borderRadius: "10px",
  },
  contenContainer: {
    padding: "20px",
    maxWidth: "500px",
  },
  cardTable: {
    fontFamily: "AvenirNextCyr",
    fontSize: "16px",
    color: "#565956",
  },
  tableCell: {
    width: "100px",
  },
  iconsButtonWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  button: {
    marginBottom: "10px",
    borderRadius: 6,
  },
  bottomIcons: {
    marginRight: "10px",
    cursor: "pointer",
  },
  poplPagePoplCardButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    width: "150px",
    height: "100%",
    backgroundColor: "#e8ede8",
    padding: "20px",
    borderTopRightRadius: theme.custom.mainBorderForBigElement,
    borderBottomRightRadius: theme.custom.mainBorderForBigElement,
  },
}));

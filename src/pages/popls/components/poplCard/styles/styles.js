import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "150px",
    maxWidth: "150px",
    height: "100px",
    marginLeft: "10px",
    "& .MuiSvgIcon-root": {
      width: "30px",
      height: "30px",
    },
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  contenContainer: {
    padding: "20px",
  },
  cardTable: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    fontSize: "16px",
    color: "#565956",
    "& a": {
      textDecoration: "underline",
    },
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    height: 29,
  },
  tableCell: {
    width: "180px",
    height: 29,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "auto",
    width: "150px",
    backgroundColor: theme.overrides.MuiDrawer.paper.backgroundColor,
    padding: "20px",
    borderTopRightRadius: theme.custom.mainBorderForBigElement,
    borderBottomRightRadius: theme.custom.mainBorderForBigElement,
  },
  popsCountNumber: {
    display: "flex",
    justifyContent: "center",
  },
  editPopl: {
    position: "absolute",
    right: 160,
    bottom: 125,
  },
  nameInput: {
    fontSize: 16,
    fontFamily: "DM Sans",
    fontWeight: 200,
    // paddingRight: 20,
  },
  disabledTextfield: {
    paddingBottom: 4,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#000000", // (default alpha is 0.38)
      fontWeight: "200",
    },
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  fieldContainer: {
    position: "relative",
    width: 500,
  },
  paddingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "10px 15px",
    "& input": {
      textAlign: "center",
    },
  },
  fieldTitle: {
    fontWeight: "bold !important",
  },
  colorInputContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",

  },
  colorElement: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#acacac",
    fontSize: "1rem",
    height: 30,
    width: "70%",
    border: "none",
    cursor: "pointer",
    borderRadius: 10,
    "& input": {
      display: "none",
    },
  },
  teamMembersPopup: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    height: 400,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    zIndex: 1000,
    // padding: 10,
    borderRadius: theme.custom.mainBorderRadius,
  },
  content: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  memberWrapper: {
    padding: "10px 20px",
    width: "100%",
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  nameItemImage: {
    width: 70,
    height: 40,
    borderRadius: 7,
    marginRight: 10,
  },
  nameItemName: {
    fontWeight: "bold",
  },
  searchInputWrapper: {
    width: "100%",
    padding: "10px 20px",
  },
  closeIcon: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    color: "#808080",
    cursor: "pointer",
    zIndex: 2000,
  },
}));

import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  fieldContainer: {
    position: "relative",
    width: "100%",
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
    fontSize: "16px !important",
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
    backgroundColor: "#212121",
    color: "#ffffff",
    fontSize: "0.875rem",
    height: 36,
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
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  nameItemImage: {
    width: 40,
    objectFit: "cover",
    height: 40,
    borderRadius: "50%",
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
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    cursor: "pointer",
    "& svg": {
      fill: "#808080",
      width: 22,
      height: 22,
    },
  },
}));

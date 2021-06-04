import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "160px",
    minWidth: 160,
    height: "170px",
    marginLeft: "10px",
    padding: "20px 0",
    "& .MuiSvgIcon-root": {
      width: "30px",
      height: "30px",
    },
  },
  leftContentWrapper: {
    display: "flex",
    alignItems: "center",
    width: "calc(100% - 100px)",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "0 auto",
  },
  contenContainer: {
    position: "relative",
    width: "100%",
    height: 170,
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  nameIconsContainer: {
    display: "flex",
    width: "100%",
  },
  iconswrapper: {
    padding: "0px 20px",
  },
  linkImage: {
    width: 30,
    height: 30,
    cursor: "pointer",
    marginRight: 10,
  },
  viewProfileButtonContainer: {
    position: "absolute",
    bottom: "15px",
    right: "30px",
  },
  dateContainer: {
    position: "absolute",
    top: "23px",
    right: "30px",
    height: 30,
  },
  viewProfileButton: {
    fontSize: 14,
    "&:hover": {
      // backgroundColor: "rgba(33, 33, 33, 0.12)",
      textDecoration: "underline",
    },
  },
  cardTable: {
    display: "flex",
    minHeight: 50,
    justifyContent: "flex-end",
    flexDirection: "column",
    // paddingTop: 10,
    fontSize: "14px",
    color: "#565956",
    "& a": {
      textDecoration: "underline",
    },
  },
  tableRow: {
    display: "flex",
  },
  tableCell: {
    width: "100%",
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
  connectedWithViewWrapper: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: "0 0 0 auto",
    padding: "10px 0",
  },
  connectedWithInfo: {
    width: "270px",
    // maxHeight: "calc (100% - 40px)",
    // overflow: "auto",
  },
  connectedWithText: {
    padding: "0 10px",
    // borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
  },
  connectedWithNames: {
    width: "100%",
    height: "120px",
    overflow: "auto",
    padding: 10,
  },
  nameItem: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    marginBottom: 5,
  },
  nameItemImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: "50%",
  },
  nameItemName: {
    fontSize: "16px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  showMoreWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    width: "100px",
    height: "100%",
  },
  showMoreContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#e5e0e0",
    },
    transition: "background-color 200ms linear",
  },
  showMoreIcon: {
    fontSize: "30px",
    cursor: "pointer",
    fill: "#908d8d",
  },
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  notConnectedViaConnectContainer: {
    height: 170,
    width: 300,
    margin: "0 10px 0 auto",
    paddingTop: 20,
  },
  noteWrapper: {
    paddingTop: 15,
    overflow: "hidden",
    maxHeight: 100,
  },
  noteTitle: {
    fontSize: "16px",
  },
  popupWrapper: {
    position: "absolute",
    display: "flex",
    zIndex: 1000,
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 10px 10px 10px",
    outline: "none",
    width: 100,
    right: 10,
    top: 110,
    minHeight: 30,
    "& > div": {
      padding: "3px 0 3px 10px",
      fontWeight: "500",
      border: "1px solid #ffffff",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#e5e0e0",
        borderRadius: theme.custom.mainBorderRadius,
      },
    },
  },
  conBio: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

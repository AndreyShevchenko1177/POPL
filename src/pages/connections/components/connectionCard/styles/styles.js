import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "160px",
    height: "130px",
    marginLeft: "10px",
    padding: "20px 0",
    "& .MuiSvgIcon-root": {
      width: "30px",
      height: "30px",
    },
  },
  leftContentWrapper: {
    display: "flex",
    width: "calc(100% - 100px)",
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
    "& a": {
      textDecoration: "underline",
    },
  },
  tableCell: {
    width: "120px",
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
    margin: "0 20px 0 auto",
    padding: "20px 0",
  },
  connectedWithInfo: {
    width: "170px",
    maxHeight: "calc (100% - 40px)",
    overflow: "auto",
  },
  connectedWithText: {
    padding: "0 10px",
    borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
  },
  connectedWithNames: {
    width: "80%",
    height: "90px",
    marginLeft: "auto",
    padding: "10px 10px 10px 0",
    fontFamily: "AvenirNextCyr, san-serif, arial",
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
    height: "100%",
    width: 300,
    margin: "0 10px 0 auto",
  },
  noteWrapper: {
    paddingTop: 15,
    overflow: "hidden",
    maxHeight: 100,
  },
  noteTitle: {
    fontFamily: "AvenirNextCyr, sna-serif, arial",
    fontSize: "16px",
  },
  noteText: {
    fontFamily: "AvenirNextCyr, sna-serif, arial",
    fontSize: "14px",
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
      fontFamily: "AvenirNextCyr, sna-serif, arial",
      fontWeight: "500",
      border: "1px solid #ffffff",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#e5e0e0",
        borderRadius: theme.custom.mainBorderRadius,
      },
    },
  },
}));

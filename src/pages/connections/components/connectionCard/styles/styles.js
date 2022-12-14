import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

  leftContentWrapper: {
    width: "100%",
    // border: '1px solid red',
    position: "relative",
    // width: "calc(100% - 325px)",
    display: "grid",
    gridTemplateColumns: "50px 80px 2fr 3fr 260px 130px 30px",
    alignItems: "center",
    justifyItems: "center",
    gridGap: "15px",
  },

  container: {
    // border: '1px solid red',
    position: "relative",
    // width: "160px",
    // minWidth: '160px',
    // height: "170px",
    "& .MuiSvgIcon-root": {
      width: "30px",
      height: "30px",
    },
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "block",
    // margin: "0 auto",
  },

  proLogo: {
    width: 20,
    height: 20,
    position: "absolute",
    top: -5,
    left: -5,
    borderRadius: "50%",
    boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },

  nameEmail: {
    justifySelf: "left",
    alignSelf: "start",
    marginTop: "7px",
    overflow: "hidden",
  },

  noteContainer: {
    justifySelf: "left",
    overflow: "hidden",
  },

  dateContainer: {
    fontWeight: "600",
    fontSize: "13px",
    // justifySelf: 'left',
    // overflow: 'hidden',
  },

  nameIconsContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },

  iconswrapper: {
    padding: "0px 20px",
    display: "flex",
    alignItems: "center",
  },
  linkImage: {
    width: 30,
    height: 30,
    cursor: "pointer",
    marginRight: 10,
  },
  viewProfileButtonContainer: {
    // border: "1px solid red",
    position: "absolute",
    bottom: "15px",
    right: "30px",
  },

  viewProfileButton: {
    fontSize: 14,
    "&:hover": {
      // backgroundColor: "rgba(33, 33, 33, 0.12)",
      textDecoration: "underline",
    },
  },

  emailWrapper: {
    fontSize: "13px",
    // width: "57%",
    // "@media (max-width: 1900px)": {
    //   width: "58%",
    // },
    // "@media (max-width: 1750px)": {
    //   width: "59%",
    // },
    // "@media (max-width: 1700px)": {
    //   width: "60%",
    // },
    // "@media (max-width: 1600px)": {
    //   width: "61%",
    // },
    // "@media (max-width: 1500px)": {
    //   width: "62%",
    // },
    // "@media (max-width: 1450px)": {
    //   width: "64%",
    // },
  },

  bioWrapper: {
    width: "57%",
    "@media (max-width: 1900px)": {
      width: "58%",
    },
    "@media (max-width: 1750px)": {
      width: "59%",
    },
    "@media (max-width: 1700px)": {
      width: "60%",
    },
    "@media (max-width: 1600px)": {
      width: "61%",
    },
    "@media (max-width: 1500px)": {
      width: "62%",
    },
    "@media (max-width: 1450px)": {
      width: "64%",
    },
  },

  cardTable: {
    display: "flex",
    // minHeight: 50,
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
    filter: "invert(100%)",
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: "50%",
    display: "block",
  },
  leftover: {
    backgroundColor: "#F2F2F2",
    color: "#828282",
    fontWeight: "700",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    // marginRight: 10,
    borderRadius: "50%",
  },
  nameItemName: {
    fontSize: "16px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  showMoreWrapper: {
    width: 325,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    height: "100%",
  },

  showMoreContainer: {
    // border: '1px solid red',
    transition: "background-color 200ms linear",
    "& svg": {
      display: "block",
    },
  },

  showMoreIcon: {
    fontSize: "30px",
    cursor: "pointer",
    fill: "#908d8d",
    opacity: "0.2",
    "&:hover": {
      opacity: "1",
    },
    transition: "all 300ms linear",
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
    maxHeight: 50,
    overflow: "hidden",
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
  },

  conNameWrapper: {
    // maxWidth: "60%",
    display: "flex",
    alignItems: "center",
  },
  conName: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: "600",
    fontSize: "16px",
  },
  verifiedLogo: {
    width: 25,
    height: 25,
    marginLeft: 10,
    borderRadius: "50%",
    // boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },

  ConnectedWithField: {
    // width: 325,
    justifySelf: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: "auto",
    // height: "100%",
  },

}));

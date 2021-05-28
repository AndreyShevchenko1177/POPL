import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  recipientsRoot: {
    display: "flex",
    width: "100%",
    height: 200,
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: 4,
  },
  recipientsList: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  selectRecipient: {
    width: "50%",
    padding: 10,
    height: "100%",
    borderRight: `1px solid ${theme.custom.mainBorderGreyColor}`,
  },
  selectRecipientBtn: {
    width: "100%",
  },
  // time of delivery
  deliveryTimeRoot: {
    width: "100%",
  },
  profilesListPopup: {
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
  profilesListCloseIcon: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    color: "#808080",
    cursor: "pointer",
    zIndex: 2000,
  },
  profilesListSearchInputWrapper: {
    width: "100%",
    padding: "10px 20px",
  },
  profilesListContent: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  profilesListMemberWrapper: {
    padding: "10px 20px",
    width: "100%",
  },
  profilesListMemberItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  profilesListNameItemImage: {
    width: 40,
    objectFit: "cover",
    height: 40,
    borderRadius: "50%",
    marginRight: 10,
  },
  profilesListNameItemName: {
    fontWeight: "bold",
  },
  profilesListCheckbox: {
    marginLeft: "auto",
  },
  profilesListBtnWrapper: {
    display: "flex",
    padding: "10px 20px",
    width: "100%",
  },
  profilesListBtn: {
    marginLeft: "auto",
  },
  recipientsContentWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  recipientItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  recipientsDeleteIcon: {
    marginLeft: "auto",
    cursor: "pointer",
    "& svg": {
      fill: "#808080",
      width: 22,
      height: 22,
    },
  },
  recipientItemImage: {
    width: 30,
    objectFit: "cover",
    height: 30,
    borderRadius: "50%",
    marginRight: 10,
  },
  recipientItemName: {
    fontWeight: "bold",
    position: "relative",
  },
  // preview styles
  rootPreview: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    padding: "20px 20px",
  },
  imageWrapper: {
    position: "relative",
  },
  smartphoneImage: {
    width: 380,
    height: 550,
  },
  notificationCard: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 300,
    height: 80,
  },
  notificationTitleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
  },
  notificationTitle: {
    display: "flex",
  },
  notificationTitleIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  notificationMessageWrapper: {
    display: "flex",
    padding: 10,
  },
  notificationMessage: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

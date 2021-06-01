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
    justifyContent: "space-between",
    padding: "10px 20px",
    width: "100%",
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
    overflow: "hidden",
    minHeight: 80,
    maxHeight: 285,
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
    flexDirection: "column",
    padding: "0 10px 10px 10px",
  },
  notificationMessage: {
    wordBreak: "break-word",
  },
  notificationMessageTitle: {
    minHeight: 25,
    fontSize: "14 !important",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  contentPlaceholder: {
    fontSize: 14,
    fontWeight: "normal",
    color: "grey",
  },
  emailRoot: {
    width: "80%",
    minWidth: 380,
    height: 550,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    padding: 20,
  },
  emailFieldsWrapper: {
    display: "flex",
    borderBottom: "1px solid #383838",
    marginBottom: 10,
  },
  emailTitles: {
    color: "#000000",
    fontSize: 16,
    paddingRight: 10,
  },
  emailText: {
    width: "100%",
    color: "#000000",
    fontSize: 16,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  emailMessage: {
    paddingTop: 20,
    color: "#000000",
    wordBreak: "break-word",
    height: 343,
    overflow: "hidden",
  },
  emailPreviewFooter: {
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    paddingTop: 20,
    color: "grey",
  },
}));

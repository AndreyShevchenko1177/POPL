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
  leftContentWrapper: {
    display: "flex",
    width: "calc(100% - 150px)",
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
  connectedWithViewWrapper: {
    display: "flex",
    flexDirection: "column",
    margin: "0 20px 0 auto",
    paddingTop: 20,
  },
  connectedWithInfo: {
    width: "170px",
    height: "100%",
  },
  connectedWithText: {
    padding: "0 10px",
    borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
  },
  connectedWithNames: {
    width: "80%",
    marginLeft: "auto",
    padding: "10px 10px 10px 0",
    fontFamily: "AvenirNextCyr, san-serif, arial",
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
}));

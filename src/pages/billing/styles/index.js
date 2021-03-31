import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    padding: "100px 40px 0 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardsContainerWrapper: {
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  titleWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 30,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: 1000,
    minWidth: 800,
    flexWrap: "wrap",
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: theme.custom.mainBorderRadius,
    "@media (max-width: 1150px)": {
      flexDirection: "column",
      minWidth: 240,
    },
  },
  cardItemContainer: {
    width: "33%",
    minHeight: 570,
    "&:nth-child(2)": {
      borderRight: `1px solid ${theme.custom.mainBorderGreyColor}`,
      borderLeft: `1px solid ${theme.custom.mainBorderGreyColor}`,
    },
    "@media (max-width: 1150px)": {
      flexDirection: "column",
      width: "100%",
      border: "none",
      "&:nth-child(2)": {
        borderTop: `1px solid ${theme.custom.mainBorderGreyColor}`,
        borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
        borderRight: "none",
        borderLeft: "none",
      },
    },
  },
  mostPopular: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    width: 110,
    height: 28,
    backgroundColor: "#1791f4",
    borderRadius: 5,
    top: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 0 20px 0",
  },
  contactSalesButton: {
    height: 40,
    marginTop: 10,
    backgroundColor: "#1791f4",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1791f4",
    },
  },
}));

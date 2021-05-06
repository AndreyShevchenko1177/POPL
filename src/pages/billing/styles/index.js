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
    minWidth: 950,
    flexWrap: "wrap",
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: theme.custom.mainBorderRadius,
    "@media (max-width: 1250px)": {
      flexDirection: "column",
      minWidth: 240,
    },
  },
  cardItemContainer: {
    width: "25%",
    minHeight: 350,
    "&:nth-child(2)": {
      // borderRight: `1px solid ${theme.custom.mainBorderGreyColor}`,
      borderLeft: `1px solid ${theme.custom.mainBorderGreyColor}`,
    },
    "&:nth-child(3)": {
      borderRight: `1px solid ${theme.custom.mainBorderGreyColor}`,
      borderLeft: `1px solid ${theme.custom.mainBorderGreyColor}`,
    },
    "@media (max-width: 1250px)": {
      flexDirection: "column",
      width: "100%",
      border: "none",
      "&:nth-child(2)": {
        borderTop: `1px solid ${theme.custom.mainBorderGreyColor}`,
        borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
        borderRight: "none",
        borderLeft: "none",
      },
      "&:nth-child(3)": {
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
    "& > h3": {
      fontWeight: "200 !important",
    },
  },
  contactSalesButton: {
    height: 50,
    width: 200,
    marginTop: 10,
    backgroundColor: "#1791f4",
    borderRadius: 4,
    fontSize: "17px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1791f4",
    },
  },
}));

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
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
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
    maxWidth: 1200,
    flexWrap: "wrap",
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: `${theme.custom.mainBorderRadius}px ${theme.custom.mainBorderRadius}px 0 0`,
    "@media (max-width: 1340px)": {
      flexDirection: "column",
      minWidth: 240,
      maxWidth: 600,
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
    "@media (max-width: 1340px)": {
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
  contactUsSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 1200,
    width: "100%",
    height: 150,
    borderRadius: `0 0 ${theme.custom.mainBorderRadius}px ${theme.custom.mainBorderRadius}px`,
    borderTop: "none",
    borderBottom: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRight: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderLeft: `1px solid ${theme.custom.mainBorderGreyColor}`,
    "@media (max-width: 1340px)": {
      minWidth: 240,
      maxWidth: 600,
      minHeight: 150,
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 0 20px 0",
    "& > h3": {
      fontWeight: "200 !important",
    },
    "& > span": {
      paddingTop: 10,
      fontSize: 16,
    },
  },
  contactSalesButton: {
    height: 50,
    width: 200,
    marginTop: 10,
    backgroundColor: "#1791f4",
    borderRadius: 4,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1791f4",
    },
  },
  justProWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
  },
  justProHeading: {
    fontSize: "18px !important",
  },
  makeJustProButton: {
    height: 40,
    width: 170,
    marginTop: 10,
    // backgroundColor: "#1791f4",
    borderRadius: 4,
    fontSize: "16px",
    fontWeight: "bold",
  },
  contactUsTitle: {
    padding: "10px 0",
  },
}));

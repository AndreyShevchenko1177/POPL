import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    padding: "80px 20px 0px 40px",
    height: "100%",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 30,
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pricingCalculator: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  estimateCard: {
    display: "flex",
    paddingTop: 10,
    "& span": {
      fontSize: "16px",
      fontWeight: 200,
      // padding: "10px 0",
    },
  },

  cardContainer: {
    display: "flex",
    width: "50%",
    minWidth: 480,
    minHeight: 110,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    border: "1px solid #dadada",
    borderRadius: 5,
    position: "relative",
  },

  note: {
    color: "#4e4c4c",
  },
  footnote: {
    color: "#4e4c4c",
    fontSize: "12px",
    position: "absolute",
    bottom: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  dashboardPlancardContainer: {
    justifyContent: "center",
    backgroundColor: "#1791f4",
    color: "#ffffff",
    cursor: "pointer",
  },
  priceDescriptionContainer: {
    display: "flex",
    minHeight: 50,
    flexDirection: "column",
    paddingTop: 10,
    position: "relative",
    "& span": {
      fontSize: "16px",
      fontWeight: 200,
      color: "#4e4c4c",
      // padding: "10px 0",
    },
  },
  subHeadings: {
    color: "#4e4c4c",
  },
  accountInput: {
    paddingLeft: 10,
    // width: "auto",
    "& input": {
      padding: "1px 0px 0px 0px",
      width: 100,
      textAlign: "center",
    },
  },
  moreContainer: {
    borderRadius: 10,
  },
  moreWindow: {
    width: 450,
    "& > div": {
      padding: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      "& > div": {
        display: "flex",
        justifyContent: "center",
        paddingBottom: 15,
        width: "100%",
        "& span": {
          textAlign: "center",
          fontSize: "15px",
          fontWeight: 700,
        },
      },
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 0 20px 0",
    "& > h3": {
      fontWeight: "200 !important",
    },
    "& > span": {
      paddingTop: 10,
      fontSize: 16,
    },
  },
  twoWeeksFreeBtn: {
    fontSize: "18px !important",
  },
  subscribeMoreBtn: {
    borderRadius: 5,
  },

}));

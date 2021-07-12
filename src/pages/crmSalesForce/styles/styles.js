import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  choiceContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 70,
  },
  choiceWrapper: {
    width: "100%",
    padding: "0px 20px",
  },
  choiceHeader: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 25,
    "& span": {
      fontWeight: 600,
      fontSize: 17,
    },
  },
  choiceCardsWrapper: {
    width: "100%",
    display: "flex",
    marginTop: "10%",
    justifyContent: "center",
    "& div": {
      cursor: "pointer",
    },
    "@media (max-width:1200px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  choiceCardContainer: {
    textAlign: "center",
    // minWidth: 360,
    width: 320,
    marginRight: 20,
    minWidth: 270,
    maxWidth: 420,
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: theme.custom.mainBorderRadius,
    "@media (max-width:1200px)": {
      marginBottom: 20,
    },
  },
  choiceCardWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },
  choiceCardTitle: {
    fontSize: 17,
    fontWeight: 600,
  },
  choiceCardDescription: {
    fontSize: 16,
    fontWeight: 400,
  },
  addLink: {
    width: 35,
    height: 35,
  },
}));

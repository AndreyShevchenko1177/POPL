import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  choiceContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 70,
  },
  choiceWrapper: {
    width: "100%",
    minWidth: 400,
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
    justifyContent: "center",
    "& div": {
      cursor: "pointer",
      marginRight: 10,
    },
    "@media (max-width:1300px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  choiceCardContainer: {
    minWidth: 320,
    marginBottom: 10,
    border: `1px solid ${theme.custom.mainBorderGreyColor}`,
    borderRadius: theme.custom.mainBorderRadius,
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

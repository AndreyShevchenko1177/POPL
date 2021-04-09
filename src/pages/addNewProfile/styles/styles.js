import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  choiceContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
  },
  choiceWrapper: {
    width: 800,
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
    justifyContent: "space-between",
    "& div": {
      cursor: "pointer",
      "@media (max-width:1100px)": {
        paddingBottom: 10,
      },
    },
    "@media (max-width:1100px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  choiceCardContainer: {
    minWidth: 360,
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
}));

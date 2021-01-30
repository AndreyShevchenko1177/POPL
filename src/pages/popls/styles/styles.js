import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  poplCard: {
    width: "200px",
    height: "150px",
    marginRight: "10px",
    padding: "5px",
  },
  button: {
    height: "50px",
    minWidth: "150px",
    fontFamily: "AvenirNextCyr",
    fontSize: "13px",
  },
  addIcon: {
    "& > *:first-child": {
      fontSize: 32,
    },
  },
}));

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles, Button } from "@material-ui/core";
import { logoutAction } from "../../auth/store/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    height: "70px",
    borderBottom: "1px solid #dddddd",
    "&:last-child": {
      borderBottom: "none",
    },
    cursor: "pointer",
  },
  title: {
    paddingLeft: "16px",
  },
  button: {
    marginLeft: "auto",
  },
}));

function LinkItem({
  name, showAssign,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div
      className={classes.container}
    >
      <Typography
        className={classes.title}
        variant='h5'
      >
        {name}
      </Typography>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={showAssign}
      >
      Assign Template
      </Button>
    </div>
  );
}

export default LinkItem;

import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";

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
}));

function LinkItem({ name, icon, path }) {
  const classes = useStyles();
  const history = useHistory();

  const redirect = () => history.push(path);

  return (
    <div
      className={classes.container}
      onClick={redirect}
    >
      {icon}
      <Typography
        className={classes.title}
        variant='h5'
      >
        {name}
      </Typography>
    </div>
  );
}

export default LinkItem;

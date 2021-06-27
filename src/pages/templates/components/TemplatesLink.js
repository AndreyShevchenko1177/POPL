import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
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
  iconContainer: {
    width: 20,
    height: 20,
  },
}));

function LinkItem({
  name, icon, path, rootPath,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutAction());

  const redirect = () => {
    if (name === "Logout") return handleLogout();
    history.push(path, { path: "/templates", rootPath });
  };

  return (
    <div
      className={classes.container}
      onClick={redirect}
    >
      <div className={classes.iconContainer}>
        {icon}
      </div>
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

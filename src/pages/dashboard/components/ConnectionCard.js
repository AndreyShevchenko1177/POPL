import React from "react";
import { Typography } from "@material-ui/core";
import userIcon from "../../../assets/svg/user.svg";
import useStyles from "./styles/style";

export default function ConnectionCard({ name, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.header_icon}>
            {/* {image */}
            <img className={classes.avatar} alt="logo" src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} style={ image ? { objectFit: "cover" } : {}} />
          </div>
          <div className={classes.header_body}>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.connectionNameText }}>{name}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

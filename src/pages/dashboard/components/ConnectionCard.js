import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import userIcon from "../../../assets/images/popl_white.png";
import useStyles from "./styles/style";

export default function ConnectionCard({
  name, image, parentProfileName, url, ...rest
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => ("noPopl" in rest ? history.push("/connections", { connectionCardId: rest.id }) : history.push(window.open(url)));

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.header_icon}>
            <img
              className={classes.avatar}
              alt="logo"
              src={image
                ? process.env.REACT_APP_BASE_IMAGE_URL + image
                : userIcon}
              style={ image
                ? { objectFit: "cover" }
                : { boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }
              }
            />
            <div style={{ minHeight: 24 }} className='full-w flex-row-center-horizontal'>
              <Typography variant="subtitle1" classes={{ subtitle1: classes.connectionNameText }}>{name}</Typography>
            </div>

          </div>
          <div className={classes.header_body}>
            <span style={{ fontWeight: "normal" }}> connected with </span>
            <div className='full-w flex-row-center-horizontal'>
              <Typography
                variant="subtitle1"
                classes={{ subtitle1: classes.connectionNameText }}
              >
                {parentProfileName}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

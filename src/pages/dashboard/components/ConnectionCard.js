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
            {/* {image */}
            <img className={classes.avatar} alt="logo" src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} style={ image ? { objectFit: "cover" } : {}} />
            <div className='full-w flex-row-center-horizontal'>
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

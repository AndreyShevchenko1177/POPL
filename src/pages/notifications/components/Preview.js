import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";
import smartphoneImage from "../../../assets/images/smartphone.png";
import appleIcon from "../../../assets/images/apple.png";

function Preview({ message, title }) {
  const classes = useStyles();

  return (
    <div className={classes.rootPreview}>
      <div className={classes.imageWrapper}>
        <img className={classes.smartphoneImage} alt='smartphone' src={smartphoneImage} />
        <Paper elevation={2} className={classes.notificationCard}>
          <div className={classes.notificationTitleWrapper}>
            <div className={classes.notificationTitle}>
              <img className={classes.notificationTitleIcon} alt='apple' src={appleIcon} />
              <span>POPL</span>
            </div>
            <div>now</div>
          </div>
          <div className={classes.notificationMessageWrapper}>
            <Typography variant='subtitle1' classes={{ subtitle1: classes.notificationMessageTitle }}>{title || <span className={classes.contentPlaceholder}><i>Notification title</i></span>}</Typography>
            <div className={classes.notificationMessage}>{message || <span className={classes.contentPlaceholder}><i>Message...</i></span>}</div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Preview;

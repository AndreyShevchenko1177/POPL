import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";

function PreviewEmail({ message, title, userEmail }) {
  const classes = useStyles();

  return (
    <div className={classes.rootPreview}>
      <Paper elevation={2} className={classes.emailRoot}>
        <div className={classes.emailFieldsWrapper}>
          <div className={classes.emailTitles}>Subject:</div>
          <div className={classes.emailText}>{title || <span className={classes.contentPlaceholder}><i>Email subject</i></span>}</div>
        </div>
        <div className={classes.emailFieldsWrapper}>
          <div className={classes.emailTitles}>From:</div>
          <div className={classes.emailText}>{userEmail || <span className={classes.contentPlaceholder}><i>Sender email</i></span>}</div>
        </div>
        <div className={classes.emailMessage}>{message}</div>
      </Paper>
    </div>
  );
}

export default PreviewEmail;

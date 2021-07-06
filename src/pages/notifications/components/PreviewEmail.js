import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";

function PreviewEmail({
  message, title, userName, children,
}) {
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
          <div className={classes.emailText}>{`${userName} via Popl Enterprise`}</div>
        </div>
        <div className={classes.emailMessage}>
          <span className={classes.emailPreviewMessage}>{message}</span>
          <br/><br/>
          {children}
          <br/><br/>
          <span className={classes.emailPreviewFooter}>Sent via Popl Enterprise</span>
        </div>
      </Paper>
    </div>
  );
}

export default PreviewEmail;

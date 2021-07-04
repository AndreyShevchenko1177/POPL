import React from "react";
import { Chip, Typography } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import useStyles from "../styles";

function Preview({
  deleteAction, file, styles,
}) {
  const classes = useStyles();

  return (
    <div className={classes.imageContainer}>
      <img style={{ ...styles.image }} alt='logo' className={classes.image} src={file.src} />
      <Chip
        style={{ ...styles.chipButton }}
        className={classes.chipButton}
        deleteicon={<RemoveIcon />}
        size='medium'
        onDelete={deleteAction}
      />
      <div className={classes.fileNameWrapper}>
        <Typography variant='subtitle1' classes={{ subtitle1: classes.fileNameText }}>{file.file.name}</Typography>
      </div>
    </div>
  );
}

export default Preview;

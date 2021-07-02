import React from "react";
import { Chip, Typography } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import useStyles from "../styles";

function Preview({
  deleteAction, file,
}) {
  const classes = useStyles();
  console.log(file);
  return (
    <div className={classes.imageContainer}>
      <img alt='logo' className={classes.image} src={file.src} />
      <Chip
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

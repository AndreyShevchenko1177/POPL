import React from "react";
import { Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import CreateIcon from "@material-ui/icons/Create";
import useStyles from "../styles";

function Preview({
  deleteAction, file, openFileDialog,
}) {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <img alt='logo' className={classes.image} src={file.src} />
      <Chip
        className={classes.chipButton}
        deleteicon={<RemoveIcon />}
        size='medium'
        onDelete={deleteAction}
      />
      <Chip
        className={classes.chipButtonEdit}
        deleteIcon={<CreateIcon />}
        size='medium'
        onDelete={() => openFileDialog()}
      />
    </div>
  );
}

export default Preview;

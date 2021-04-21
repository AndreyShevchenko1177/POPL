import React from "react";
import { Chip } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import useStyles from "../styles";

function Preview({
  deleteAction, file, width = "100px", height = "100px", small,
}) {
  const classes = useStyles();
  // console.log(file);
  return (
    <div className={classes.imageContainer}>
      <img alt='logo' className={classes.image} src={file.src} />
      <Chip
        className={classes.chipButton}
        deleteicon={<RemoveIcon />}
        size='medium'
        onDelete={deleteAction}
      />
    </div>
  );
}

export default Preview;

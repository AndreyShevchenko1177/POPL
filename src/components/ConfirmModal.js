import React from "react";
import {
  Dialog, DialogTitle, Button, makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: "5px 24px 20px 24px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

function ConfirmModal({
  dialogTitle, okButtonTitle, cancelButtonTitle, okButtonTitleColor = "inherit", cancelButtonTitleColor = "inherit", open, onClose, onOk, onCancel,
}) {
  const classes = useStyles();

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
      <div className={classes.contentContainer}>
        <div className={classes.buttonContainer}>
          <Button variant='outlined' style={{ color: okButtonTitleColor }} onClick={onOk}>{okButtonTitle}</Button>
          <Button variant='outlined' style={{ color: cancelButtonTitleColor }} onClick={onCancel}>{cancelButtonTitle}</Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmModal;

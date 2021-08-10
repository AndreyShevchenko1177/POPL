import React from "react";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import useStyles from "./styles";

export default function EventPopup({
  data, closeModalEvent, onModalHandler,
}) {
  const classes = useStyles();
  let a = 5 + 2;

  return (
    <>
      <div className={classes.opacityBackground} onClick={closeModalEvent}></div>
      <Paper elevation={5} className={classes.eventPopup}>
        <div>
          <div className={classes.closeButton} onClick={closeModalEvent}>
            <IconButton>
              <CloseIcon fontSize='small' />
            </IconButton>
          </div>
          <div className={classes.deleteButton} onClick={() => { closeModalEvent(); data?.event?.deleteThisEvent(); }}>
            <IconButton>
              <DeleteForeverOutlinedIcon fontSize='small' />
            </IconButton>
          </div>
          <div className={classes.editButton} onClick={() => { closeModalEvent(); onModalHandler(data, true); }}>
            <IconButton>
              <EditOutlinedIcon fontSize='small' />
            </IconButton>
          </div>
        </div>
        <div onClick={closeModalEvent}>
          {data?.event?.values?.title}
        </div>

      </Paper>

    </>
  );
}

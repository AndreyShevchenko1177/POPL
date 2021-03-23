import React from "react";
import {
  Checkbox, Typography, IconButton, Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";

export function NotConnectedCard({
  name, url, image, time, editAction, note, number, email, ...rest
}) {
  const classes = useStyles();
  return (
    <>
      <DragDots position="center" />
      <div className={classes.leftContentWrapper}>
        <div className={classes.container}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ width: "40px", height: "40px" }}
          />
          <img className={classes.avatar} alt="logo" src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} style={ image ? { objectFit: "cover" } : {}} />
        </div>
        <div className={classes.contenContainer}>
          <Typography variant="h5">{name}</Typography>
          <table>
            <tbody className={classes.cardTable}>
              <tr>
                <td className={classes.tableCell}>Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>Phone:</td>
                <td>{number}</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>Created:</td>
                <td>{dateFormat(time)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.notConnectedViaConnectContainer}>
          <Typography variant='h6'>VIA CONNECT</Typography>
          <div className={classes.noteWrapper}>
            <span className={classes.noteTitle}>Note: </span>
            <span className={classes.noteText}>{note}</span>
          </div>
        </div>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          className={classes.button}
          onClick={() => editAction({
            ...rest, name, email, number, note,
          })}
        >
          Edit
        </Button>
        <div className={classes.iconsButtonWrapper}>
          <IconButton
            className={classes.deleteButton}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

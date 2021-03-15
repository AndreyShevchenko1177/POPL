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

function PoplCard({
  name, url, image, time, editAction, ...rest
}) {
  const classes = useStyles();
  return (
    <>
      <DragDots position="center" />
      <div className={classes.container}>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ width: "40px", height: "40px" }}
        />
        <img className={classes.avatar} alt="logo" src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} />
      </div>
      <div className={classes.contenContainer}>
        <Typography variant="h5">{name}</Typography>
        <table>
          <tbody className={classes.cardTable}>
            <tr>
              <td className={classes.tableCell}>Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>URL:</td>
              <td>{url}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Created:</td>
              <td>{dateFormat(time)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          className={classes.button}
          onClick={() => editAction({
            ...rest, name, url, image, time,
          })}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<EqualizerIcon />}
          className={classes.button}
        >
          Analytics
        </Button>
        <div className={classes.iconsButtonWrapper}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FileCopyIcon />
          </IconButton>
          <IconButton
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

export default PoplCard;

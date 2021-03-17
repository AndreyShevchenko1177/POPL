import React from "react";
import {
  Checkbox, Typography, IconButton, Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/poplIcon.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";

function PoplCard({ popl, editAction }) {
  const classes = useStyles();
  return (
    <>
      <DragDots position="center" />
      <div className={classes.container}>
        <Checkbox
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{ width: "40px", height: "40px", transform: "scale(1.5)" }}
        />
        <img className={classes.avatar} alt="logo" src={userIcon} />
      </div>
      <div className={classes.contenContainer}>
        <Typography variant="h5">{popl.name}</Typography>
        <table>
          <tbody className={classes.cardTable}>
            <tr>
              <td className={classes.tableCell}>Name:</td>
              <td>{popl.name}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Slug:</td>
              <td>{popl.url}</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>Created:</td>
              <td>{dateFormat(popl.activationDate, "withTime")}</td>
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
          onClick={() => editAction(popl)}
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

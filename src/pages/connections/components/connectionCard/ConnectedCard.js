import React from "react";
import {
  Checkbox, Typography, IconButton, Button, Paper,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";

export function ConnectedCard({
  name, url, image, time, editAction, names, ...rest
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
          <table>
            <tbody className={classes.cardTable}>
              <tr>
                <td className={classes.tableCell}>Name:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>Connect Date:</td>
                <td>{dateFormat(time)}</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>URL:</td>
                <td><a href={url} target='blank'>{url && url.split("https://")[1]}</a></td>
              </tr>
            </tbody>
          </table>
          <div className='pt-5'>
            <Button
              variant="text"
              size="small"
              color="primary"
              startIcon={<ArrowDropDownIcon />}
              onClick={() => url && window.open(`${url}`)}
            >
                  View Profile
            </Button>
          </div>
        </div>
        <div className={classes.connectedWithViewWrapper}>
          <Paper className={classes.connectedWithInfo}>
            <Typography className={classes.connectedWithText} variant='h5'>Connected with:</Typography>
            <div className={classes.connectedWithNames}>
              {names?.map((el, key) => <p key={key}> {el}</p>)}
            </div>
          </Paper>
        </div>
      </div>
      <div className={classes.poplPagePoplCardButtonsContainer}>
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

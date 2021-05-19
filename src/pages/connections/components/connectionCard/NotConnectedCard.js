import React, { useState } from "react";
import {
  Checkbox, Tooltip, Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";
import Popup from "../../../../components/popup";

export function NotConnectedCard({
  name, url, image, time, note, number, email, isChecked, handleChangeCheckbox, bio, ...rest
}) {
  const classes = useStyles();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleDeleteConnection = () => {
    setIsOpenPopup(false);
    console.log(`delete ${name} connection`);
  };

  const popupConfig = [
    {
      id: 2,
      name: "Edit",
      // onClick: () => editAction({
      //   ...rest, name, email, number, note,
      // }),
    },
    {
      id: 1,
      name: "Delete",
      onClick: handleDeleteConnection,
    },
  ];

  return (
    <>
      <DragDots position="center" />
      <div className={classes.leftContentWrapper}>
        <div className={classes.container}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ width: "40px", height: "40px" }}
            name={rest.customId.toString()}
            checked={isChecked || false}
            onChange={handleChangeCheckbox}
          />
          <img className={classes.avatar} alt="logo" src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} style={ image ? { objectFit: "cover" } : {}} />
        </div>
        <div className={classes.contenContainer}>
          <Typography variant="h5">{name}</Typography>
          <div className='full-w'>
            <Tooltip title={bio || ""} placement="top">
              <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{bio}</Typography>
            </Tooltip>
          </div>
          <div className={classes.cardTable}>
            <div className={classes.tableRow}>
              <div className={classes.tableCell}>Email:</div>
              <div className={classes.tableCell}>{email}</div>
            </div>
            <div className={classes.tableRow}>
              <div className={classes.tableCell}>Phone:</div>
              <div className={classes.tableCell}>{number}</div>
            </div>
            <div className={classes.tableRow}>
              <div className={classes.tableCell}>Created:</div>
              <div className={classes.tableCell}>{dateFormat(time)}</div>
            </div>
          </div>
        </div>
        <div className={classes.notConnectedViaConnectContainer}>
          <Typography variant='h6'>VIA CONNECT</Typography>
          <div className={classes.noteWrapper}>
            <span className={classes.noteTitle}>Note: </span>
            <span className={classes.noteText}>{note}</span>
          </div>
        </div>
      </div>
      <div className={classes.showMoreWrapper}>
        <div className={classes.showMoreContainer}>
          <MoreVertIcon className={classes.showMoreIcon} onClick={() => setIsOpenPopup(!isOpenPopup)} />
          <Popup config={popupConfig} isOpen={isOpenPopup} handleClose={() => setIsOpenPopup(false)} />
        </div>
      </div>
    </>
  );
}

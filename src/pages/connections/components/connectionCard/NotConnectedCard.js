import React, { useState } from "react";
import {
  Checkbox, Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";
import Popup from "./Popup";

export function NotConnectedCard({
  name, url, image, time, editAction, note, number, email, ...rest
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
      onClick: () => editAction({
        ...rest, name, email, number, note,
      }),
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
      <div className={classes.showMoreWrapper}>
        <div className={classes.showMoreContainer}>
          <MoreVertIcon className={classes.showMoreIcon} onClick={() => setIsOpenPopup(!isOpenPopup)} />
          <Popup config={popupConfig} isOpen={isOpenPopup} handleClose={() => setIsOpenPopup(false)} />
        </div>
      </div>
    </>
  );
}

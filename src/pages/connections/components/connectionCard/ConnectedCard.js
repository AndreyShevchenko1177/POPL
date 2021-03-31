import React, { useState } from "react";
import {
  Checkbox, Typography, Button, Paper,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import DragDots from "../../../../components/dragDots";
import { dateFormat } from "../../../../utils/dates";
import Popup from "./Popup";

export function ConnectedCard({
  name, url, image, time, editAction, names, ...rest
}) {
  const classes = useStyles();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleDeleteConnection = () => {
    setIsOpenPopup(false);
    console.log(`delete ${name} connection`);
  };

  const popupConfig = [
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
              {names?.map((el, key) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between" }}>
                  <img style={{ width: 15, height: 15 }} src={process.env.REACT_APP_BASE_IMAGE_URL + el.image}/>
                  <p > {el.name}</p>
                </div>

              ))}
            </div>
          </Paper>
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

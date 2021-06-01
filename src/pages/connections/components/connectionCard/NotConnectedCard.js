import React, { useState } from "react";
import {
  Checkbox, Paper, Tooltip, Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/popl_white_via_connect.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat, formatDateConnections } from "../../../../utils/dates";
import Popup from "../../../../components/popup";
import icons from "../../../profiles/components/profilelsIcons/icons";

const iconsConfig = {
  twitter: 5,
  linkedin: 7,
  facebook: 6,
};

export function NotConnectedCard({
  name, url, image, time, note, number, email, isChecked, setCheckbox, bio, fullContact, names, ...rest
}) {
  const classes = useStyles();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleDeleteConnection = () => {
    setIsOpenPopup(false);
    console.log(`delete ${name} connection`);
  };

  const handleChangeCheckbox = () => setCheckbox((prev) => ({ ...prev, [rest.customId]: !isChecked }));

  const linkRedirect = (path) => {
    try {
      console.log(path);
      return window.open(path);
    } catch (error) {
      console.log(error);
    }
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
          <img className={classes.avatar} alt="logo" src={fullContact?.avatar ? fullContact.avatar : userIcon} style={ image ? { objectFit: "cover" } : {}} />
        </div>
        <div className={classes.contenContainer}>
          <div className={classes.nameIconsContainer}>
            <Typography variant="h5">{name}</Typography>
            <div className={classes.iconswrapper}>
              {
                Object.keys(iconsConfig).map((key) => {
                  if (fullContact && fullContact[key]) {
                    return (
                      <img
                        key={iconsConfig[key]}
                        onClick={() => linkRedirect(fullContact[key])}
                        className={classes.linkImage}
                        src={icons[iconsConfig[key]]?.icon} alt={"title"}
                      />
                    );
                  }
                  return null;
                })
              }
            </div>
          </div>
          <div className='full-w'>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{fullContact?.title}</Typography>
          </div>
          <div className='full-w'>
            <Tooltip title={bio || ""} placement="top">
              <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{bio}</Typography>
            </Tooltip>
          </div>
          <div className='full-w'>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{fullContact?.organization}</Typography>
          </div>
          <div className='full-w'>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{dateFormat(time)}</Typography>
          </div>
          <div className='full-w'>
            <Tooltip PopperProps={{ disablePortal: true }} title={note || ""} placement="left-start">
              <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{note}</Typography>
            </Tooltip>
          </div>
        </div>
        <div className={classes.connectedWithViewWrapper}>
          <Paper style={{ backgroundColor: "#f3f5f3" }} className={classes.connectedWithInfo}>
            <Typography className={classes.connectedWithText} variant='h5'>Connected with:</Typography>
            <div className={classes.connectedWithNames}>
              {Object.values(names)?.sort((a, b) => new Date(formatDateConnections(b.connected)) - new Date(formatDateConnections(a.connected)))?.map((el, key) => (
                <Tooltip key={key} title={formatDateConnections(el.connected) || ""} placement="top">
                  <Paper style={{ backgroundColor: "#f3f5f3" }} elevation={0} className={classes.nameItem}>
                    <img alt='userIcon' className={classes.nameItemImage} src={el.image ? process.env.REACT_APP_BASE_IMAGE_URL + el.image : userIcon} style={ el.image ? { objectFit: "cover" } : {}} />
                    <p className={classes.nameItemName} > {el.name}</p>
                  </Paper>
                </Tooltip>
              ))}
            </div>
          </Paper>
        </div>
        {/* <div className={classes.notConnectedViaConnectContainer}>
          <Typography variant='h6'>VIA CONNECT</Typography>
          <div className={classes.noteWrapper}>
            <span className={classes.noteTitle}>Note: </span>
            <Tooltip PopperProps={{ disablePortal: true }} title={note || ""} placement="left-start">
              <span className={classes.noteText}>{note}</span>
            </Tooltip>
          </div>
        </div> */}
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

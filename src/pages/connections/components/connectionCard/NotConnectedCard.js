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
import icons from "../../../profiles/components/profilelsIcons/icons";

const iconsConfig = {
  twitter: 5,
  linkedin: 7,
  facebook: 6,
};

export function NotConnectedCard({
  name, url, image, time, note, number, email, isChecked, setCheckbox, bio, fullContact, ...rest
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
        </div>
        <div className={classes.notConnectedViaConnectContainer}>
          <Typography variant='h6'>VIA CONNECT</Typography>
          <div className={classes.noteWrapper}>
            <span className={classes.noteTitle}>Note: </span>
            <Tooltip PopperProps={{ disablePortal: true }} title={note || ""} placement="left-start">
              <span className={classes.noteText}>{note}</span>
            </Tooltip>
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

import React, { useState } from "react";
import {
  Checkbox, Paper, Tooltip, Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/popl_white.png";
import DragDots from "../../../../components/dragDots";
import { dateFormat, formatDateConnections } from "../../../../utils/dates";
import Popup from "../../../../components/popup";
import icons from "../../../profiles/components/profilelsIcons/icons";

const iconsConfig = {
  twitter: 5,
  linkedin: 7,
  facebook: 6,
  website: 24,
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
      if (path === 25) return window.open(`https://maps.google.com/?q=${rest.lat},${rest.long}`);
      if (path === 8) return window.open(`sms:${number}`);
      if (path === 9) return window.open(`mailto:${email}`);
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

  console.log(number);

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
          <img
            className={classes.avatar}
            alt="logo"
            src={fullContact?.avatar ? fullContact.avatar : userIcon} style={ image
              ? { objectFit: "cover" }
              : { boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }
            }
          />
        </div>
        <div className={classes.contenContainer}>
          <div className={classes.nameIconsContainer}>
            <Typography variant="h5">{name}</Typography>
            <div className={classes.iconswrapper}>
              <>
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
                {number && <img
                  onClick={() => linkRedirect(8)}
                  className={classes.linkImage}
                  src={icons[8]?.icon} alt={"number"}
                />}
                {email && <img
                  onClick={() => linkRedirect(9)}
                  className={classes.linkImage}
                  src={icons[9]?.icon} alt={"mail"}
                />}
                {rest.long && rest.lat && <img
                  onClick={() => linkRedirect(25)}
                  className={classes.linkImage}
                  src={icons[25]?.icon} alt={"location"}
                />}
              </>
            </div>
          </div>
          <div className='full-w'>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{fullContact?.title}</Typography>
          </div>
          {bio && <div className={classes.bioWrapper}>
            <Tooltip title={bio || ""} placement="top">
              <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{bio}</Typography>
            </Tooltip>
          </div>}
          {fullContact?.organization && <div style={{ height: 25 }} className={classes.bioWrapper}>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{fullContact?.organization}</Typography>
          </div>}
          <div className={clsx(classes.dateContainer)}>
            <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{dateFormat(time)}</Typography>
          </div>
          <div className='full-w'>
            <Tooltip PopperProps={{ disablePortal: true }} title={note || ""} placement="left-start">
              <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{note}</Typography>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={classes.showMoreWrapper}>
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
        <div className={classes.showMoreContainer}>
          <MoreVertIcon className={classes.showMoreIcon} onClick={() => setIsOpenPopup(!isOpenPopup)} />
          <Popup config={popupConfig} isOpen={isOpenPopup} handleClose={() => setIsOpenPopup(false)} />
        </div>
      </div>
    </>
  );
}

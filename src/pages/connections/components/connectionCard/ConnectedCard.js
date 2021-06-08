import React, {
  useState, useEffect, useRef, memo,
} from "react";
import {
  Checkbox, Typography, Paper, Tooltip,
} from "@material-ui/core";
import utf8 from "utf8";
import { useLocation } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/images/popl_white.png";
import DragDots from "../../../../components/dragDots";
import { formatDateConnections } from "../../../../utils/dates";
import Popup from "../../../../components/popup";
import proIcon from "../../../../assets/images/pro_icon.png";
import verifiedIcon from "../../../../assets/images/verified.png";

export const ConnectedCard = memo(({
  name, url, image, time, names, checked, setCheckbox, bio, ...rest
}) => {
  const classes = useStyles();
  const location = useLocation();
  const refConnection = useRef(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleDeleteConnection = () => {
    setIsOpenPopup(false);
    console.log(`delete ${name} connection`);
  };

  const handleChangeCheckbox = () => setCheckbox((prev) => ({ ...prev, [rest.customId]: !checked }));

  const popupConfig = [
    {
      id: 1,
      name: "Delete",
      onClick: handleDeleteConnection,
    },
  ];

  const decodeName = (name) => {
    try {
      const result = utf8.decode(name);
      return result;
    } catch (error) {
      return name;
    }
  };

  const getScrollValue = (v) => () => v; // with closure

  useEffect(() => {
    if (refConnection?.current) {
      const getScrollYValue = getScrollValue((window.scrollY));
      refConnection?.current?.scrollIntoView(false);
      window.scrollTo({ top: getScrollYValue() });
    }
  }, []);

  return (
    <>
      <DragDots position="center" />
      <div className={classes.leftContentWrapper} ref={location.state?.connectionCardId === rest.id ? refConnection : null}>
        <div className={classes.container}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ width: "40px", height: "40px" }}
            name={rest.customId.toString()}
            checked={checked || false}
            onChange={handleChangeCheckbox}
          />
          <img
            className={classes.avatar}
            alt="logo"
            src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon}
            style={ image
              ? { objectFit: "cover" }
              : { boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }
            }
          />
          {rest.pro == "1" && <img
            alt='pro-log'
            className={classes.proLogo}
            src={proIcon}
          />}
        </div>
        <div className={classes.contenContainer}>
          <div className={classes.conNameWrapper}>
            <Typography variant="h5" classes={{ h5: classes.conName }}>{name}</Typography>
            {rest.v == "1" && <img
              alt='pro-log'
              className={classes.verifiedLogo}
              src={verifiedIcon}
            />}
          </div>
          {bio || rest.bioBusiness && <div className={classes.bioWrapper}>
            <Tooltip title={bio || ""} placement="top">
              <Typography variant="subtitle1" classes={{ subtitle1: classes.conBio }}>{bio || rest.bioBusiness}</Typography>
            </Tooltip>
          </div>}
          {rest.location && <div className={classes.cardTable}>
            <div className={classes.tableRow}>
              <div className={classes.tableCell}><a href={url} target='blank'>{rest.location}</a></div>
            </div>
          </div>}
          <div className={classes.dateContainer}>
            {formatDateConnections(time)}
          </div>
          <div className={classes.viewProfileButtonContainer}>
            <a className={classes.viewProfileButton} href={url} target='blank'>View Profile</a>
          </div>
        </div>
      </div>
      <div className={classes.showMoreWrapper}>
        <div className={classes.connectedWithViewWrapper}>
          <Paper className={classes.connectedWithInfo}>
            <Typography className={classes.connectedWithText} variant='h5'>Connected with:</Typography>
            <div className={classes.connectedWithNames}>
              {Object.values(names)?.sort((a, b) => new Date(formatDateConnections(b.connected)) - new Date(formatDateConnections(a.connected)))?.map((el, key) => (
                <Tooltip key={key} title={formatDateConnections(el.connected) || ""} placement="top">
                  <Paper elevation={0} className={classes.nameItem}>
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
});

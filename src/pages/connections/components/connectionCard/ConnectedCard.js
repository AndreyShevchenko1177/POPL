import React, { useState, useEffect, useRef } from "react";
import {
  Checkbox, Typography, Button, Paper, Tooltip,
} from "@material-ui/core";
import utf8 from "utf8";
import { useLocation } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import useStyles from "./styles/styles";
import userIcon from "../../../../assets/svg/user.svg";
import DragDots from "../../../../components/dragDots";
import { formatDateConnections } from "../../../../utils/dates";
import Popup from "../../../../components/popup";

export function ConnectedCard({
  name, url, image, time, names, ...rest
}) {
  const classes = useStyles();
  const location = useLocation();
  const refConnection = useRef(null);
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
            checked={location.state?.connectionCardId === rest.id}
          />
          <img className={classes.avatar} alt="logo" src={image ? process.env.REACT_APP_BASE_IMAGE_URL + image : userIcon} style={ image ? { objectFit: "cover" } : {}} />
        </div>
        <div className={classes.contenContainer}>
          <Typography variant="h5">{name}</Typography>
          <div className={classes.cardTable}>
            <div className={classes.tableRow}>
              {/* <div className={classes.tableCell}>Last Connected:</div> */}
              <div className={classes.tableCell}>{formatDateConnections(time)}</div>
            </div>
            <div className={classes.tableRow}>
              {/* <div className={classes.tableCell}>URL:</div> */}
              <div className={classes.tableCell}><a href={url} target='blank'>{url && url.split("https://")[1]}</a></div>
            </div>
          </div>
          <div className={classes.viewProfileButtonContainer}>
            <Button
              variant="text"
              size="small"
              color="primary"
              classes={{ root: classes.viewProfileButton }}
              style={{ fontSize: 15 }}
              // startIcon={<ArrowDropDownIcon />}
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
              {Object.values(names)?.sort((a, b) => new Date(formatDateConnections(b.connected)) - new Date(formatDateConnections(a.connected)))?.map((el, key) => (
                <Tooltip key={key} title={formatDateConnections(el.connected) || ""} placement="top">
                  <Paper className={classes.nameItem}>
                    <img alt='userIcon' className={classes.nameItemImage} src={el.image ? process.env.REACT_APP_BASE_IMAGE_URL + el.image : userIcon} style={ el.image ? { objectFit: "cover" } : {}} />
                    <p className={classes.nameItemName} > {el.name}</p>
                  </Paper>
                </Tooltip>
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

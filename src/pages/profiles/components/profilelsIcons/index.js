import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import icons from "./icons";
import useStyles from "../profileCard/styles/styles";
import { downLoadFile } from "./downLoadAction";
import { downloadContacts } from "./downLoadContacts";

export default function SocialPoplsIcons({
  style, data, handleClick, profileId, profileName, showEditIcon, setShowEditIcon, showEditModal, name,
}) {
  const classes = useStyles();

  const linkRedirect = (path, linkId, value) => {
    try {
      if (linkId === 37) return downLoadFile(path, value);
      if (linkId === 22) return downloadContacts(path, profileName);
      return window.open(path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditIcon = (title, value, id, clicks, currentIcon, name, hash, icon) => {
    setShowEditIcon(false);
    showEditModal(title, value, id, clicks, currentIcon, name, hash, icon);
  };

  return (
    <>
      {data.map(({
        title, value, id, clicks, icon, hash,
      }, key) => (
        <div key={key} className={classes.linkClicksWrapper}>

          {showEditIcon && <div className={classes.linksEditWrapper} onClick={() => handleClickEditIcon(title, value, id, clicks, icons[id], name, hash, icon)}>
            <EditIcon style={{ width: 15, height: 15 }}/>
          </div>}
          <div
            onClick={(event) => handleClick(event, () => linkRedirect(id === 22 ? icons[id].path + profileId : icons[id].path + value, id, value))}
            className={classes.iconItem}
          >
            <img
              className={style}
              src={icon
                ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media`
                : icons[id]?.icon} alt={title}
            />
          </div>
          {/* <span className={classes.clicksText}>{`${clicks}`}</span> */}
        </div>
      ))}
    </>
  );
}

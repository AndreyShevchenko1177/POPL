import React from "react";
import icons from "./icons";
import useStyles from "../profileCard/styles/styles";
import { downLoadFile } from "./downLoadAction";
import { downloadContacts } from "./downLoadContacts";

export default function SocialPoplsIcons({
  style, data, handleClick, profileId,
}) {
  const classes = useStyles();

  const linkRedirect = (path, linkId, value) => {
    try {
      if (linkId === 37) return downLoadFile(path, value);
      if (linkId === 22) return downloadContacts(path, value);
      // if (linkId === 22) return;
      return window.open(path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data.map(({
        title, value, id, clicks, icon,
      }, key) => (
        <div key={key} className={classes.linkClicksWrapper}>
          <div
            onClick={(event) => handleClick(event, () => linkRedirect(id === 22 ? icons[id].path + profileId : icons[id].path + value, id, value))}
            className={classes.iconItem}
          >
            <img className={style} src={icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media` : icons[id].icon} alt={title} />
          </div>
          <span className={classes.clicksText}>{`${clicks}`}</span>
        </div>
      ))}
    </>
  );
}

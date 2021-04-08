import React from "react";
import icons from "./icons";
import useStyles from "../profileCard/styles/styles";

export default function SocialPoplsIcons({ style, data, handleClick }) {
  const classes = useStyles();

  const linkRedirect = (path) => {
    window.open(path);
  };

  return (
    <>
      {data.map(({
        title, value, id, clicks, icon,
      }, key) => (
        <div key={key} className={classes.linkClicksWrapper}>
          <div
            onClick={(event) => handleClick(event, () => linkRedirect(icons[id].path + value))}
            className={classes.iconItem}
          >
            <img className={style} src={icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media` : icons[id].icon} alt={title} />
          </div>
          <span className={classes.clicksText}>{`${clicks} taps`}</span>
        </div>
      ))}
    </>
  );
}

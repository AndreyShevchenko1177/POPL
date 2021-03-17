import React from "react";
import icons from "./icons";
import useStyles from "../profileCard/styles/styles";

export default function SocialPoplsIcons({ style, data, handleClick }) {
  const linkRedirect = (path) => {
    window.open(`https://${path}`);
  };
  const classes = useStyles();

  return (
    <>
      {data.map(({
        title, value, id, clicks, icon,
      }, key) => (
        <div key={key} className={classes.linkClicksWrapper}>
          <div
            onClick={(event) => handleClick(event, () => linkRedirect(value))}
            className={classes.iconItem}
          >
            <img className={style} src={icon ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media` : icons[id]} alt={title} />
          </div>
          <span className={classes.clicksText}>{`${clicks} taps`}</span>
        </div>
      ))}
    </>
  );
}

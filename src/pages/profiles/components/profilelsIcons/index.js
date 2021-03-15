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
        title, value, id, clicks,
      }, key) => (
        <div className={classes.linkClicksWrapper}>
          <div
            onClick={(event) => handleClick(event, () => linkRedirect(value))}
            className={classes.iconItem}
            key={key}
          >
            <img style={{ width: "50px" }} src={icons[id]} alt={title} />
          </div>
          <span className={classes.clicksText}>{`${clicks} taps`}</span>
        </div>
      ))}
    </>
  );
}

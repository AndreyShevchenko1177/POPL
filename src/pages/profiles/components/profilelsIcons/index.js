import React from "react";

import icons from "./icons";

export default function SocialPoplsIcons({ style, data, handleClick }) {
  const linkRedirect = (path) => {
    window.open(`https://${path}`);
  };
  return (
    <>
      {data.map(({ title, value, id }, key) => (
        <div
          onClick={(event) => handleClick(event, () => linkRedirect(value))}
          className={style}
          key={key}
        >
          <img style={{ width: "50px" }} src={icons[id]} alt={title} />
        </div>
      ))}
    </>
  );
}

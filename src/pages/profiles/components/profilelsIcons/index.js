import React from "react";

import icons from "./icons";

export default function SocialPoplsIcons({ style, data }) {
  return (
    <>
      {data.map(({ title, value }, key) => (
        <div className={style} key={key}>
          <a href={`https://${value}`} target="blank">
            <img style={{ width: "50px" }} src={icons[title]} alt={title} />
          </a>
        </div>
      ))}
    </>
  );
}

import React from "react";

import icons from "./icons";

export default function SocialPoplsIcons({ style, mockData }) {
  return (
    <>
      {mockData.map((title, key) => (
        <div className={style} key={key}>
          <img style={{ width: "40px" }} src={icons[title]} alt={title} />
        </div>
      ))}
    </>
  );
}

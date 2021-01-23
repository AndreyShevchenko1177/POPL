import React from "react";

import icons from "./icons";

const mockData = [
  {
    title: "facebook",
  },
  {
    title: "snapchat",
  },
  {
    title: "twitter",
  },
  {
    title: "twitch",
  },
  {
    title: "google",
  },
  {
    title: "facebook",
  },
  {
    title: "whatsapp",
  },
  {
    title: "facebook",
  },
  {
    title: "venmo",
  },
  {
    title: "snapchat",
  },
];

export default function SocialPoplsIcons({ style }) {
  return (
    <>
      {mockData.map(({ title }, key) => (
        <div style={style} key={key}>
          <img style={{ width: "40px" }} src={icons[title]} alt={title} />
        </div>
      ))}
    </>
  );
}

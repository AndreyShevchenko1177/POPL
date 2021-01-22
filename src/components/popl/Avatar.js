import React from "react";

export default function Avatar({ src, name, styles }) {
  return <img src={src} alt={name} style={{ ...styles }} />;
}

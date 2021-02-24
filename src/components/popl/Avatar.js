import React from "react";

export default function Avatar({ src, name, styles }) {
  return (
    <img
      className="cursor-default"
      src={src}
      alt={name}
      style={{ ...styles }}
    />
  );
}

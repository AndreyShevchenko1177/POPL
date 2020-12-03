import React from "react";

export default function PoplIcon(props) {
  const { imgSrc, title } = props;
  return (
    <>
      <div className="insta">
        <img src={imgSrc} alt={title} />
        <p>{title}</p>
      </div>
    </>
  );
}

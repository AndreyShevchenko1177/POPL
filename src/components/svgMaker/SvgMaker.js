import React from "react";
import { svgs } from "./svgs";

function SvgMaker({
  name, fill,
}) {
  const SVG = svgs[name];
  return <SVG fill={fill}/>;
}

export default SvgMaker;

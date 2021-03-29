import React from "react";
import { svgs } from "./svgs";

function SvgMaker({
  name, fill, width, height,
}) {
  const SVG = svgs[name];
  return <SVG fill={fill} width={width} height={height}/>;
}

export default SvgMaker;

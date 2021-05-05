/* eslint-disable no-bitwise */
export function defineDarkColor(hex) {
  console.log(hex);
  const c = hex.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  console.log(luma);
  if (luma < 60) {
    return "#ffffff";
  }
  return "#000000";
}

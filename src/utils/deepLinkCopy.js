/* eslint-disable no-prototype-builtins */
export function deepLinkCopy(item) {
  if (typeof (item) !== "object") {
    return item;
  }
  if (!item) {
    return item; // null
  }

  let result = (item instanceof Array) ? [] : {};
  for (let value in item) {
    if (item.hasOwnProperty(value)) {
      result[value] = deepLinkCopy(item[value]);
    }
  }
  return result;
}

export const addCommas = (str) => {
  if (!str) return;
  if (str.length < 4) return str;
  let newStr = `${str.slice(0, str.length - 3)},${str.slice(str.length - 3)}`;
  return newStr;
};

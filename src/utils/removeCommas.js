/* eslint-disable no-return-assign */
/* eslint-disable no-continue */
export const removeCommas = (string) => {
  let commas = "";
  let newString = "";
  if (string[0] === "[" && string.length === 1) return newString = "[]";
  for (let i = 0; i < string.length; i++) {
    if (commas.length > 1 && string[i] !== ",") {
      commas = "";
      newString += string[i];
    } else if (string[i] === ",") {
      commas += string[i];
      if (string.length - 2 === i) continue;
      if (i && commas.length === 1 && newString.length !== 1) newString += string[i];
    } else {
      newString += string[i];
      commas = "";
    }
  }
  return newString;
};

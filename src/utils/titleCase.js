export function titleCase(str) {
  return str.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

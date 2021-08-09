export function shallowCompare(newObj, prevObj) {
  for (let key in newObj) {
    if (newObj[key] !== prevObj[key]) return false;
  }
  return true;
}

// function using for temporary restricting all actions except get data
export function restrictEdit(userId) {
  console.log(userId);
  if (userId == "243104") return true;
  return false;
}

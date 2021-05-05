export function uniqueObjectsInArray(a, key) {
  if (!a) return null;
  return [
    ...new Map(
      a.map((x) => [key(x), x]),
    ).values(),
  ];
}

export function uniqueObjectsInArray(a, key) {
  return [
    ...new Map(
      a.map((x) => [key(x), x]),
    ).values(),
  ];
}

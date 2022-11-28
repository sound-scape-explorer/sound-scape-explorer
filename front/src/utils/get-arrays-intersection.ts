export function getArraysIntersection(arrays: string[][]) {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
}

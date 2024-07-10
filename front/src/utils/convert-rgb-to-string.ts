export function convertRgbToString([r, g, b]: [
  number,
  number,
  number,
]): string {
  return `rgb(${r},${g},${b})`;
}

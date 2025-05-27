import chroma from 'chroma-js';

export function convertRgbToString([r, g, b]: [
  number,
  number,
  number,
]): string {
  return `rgb(${r},${g},${b})`;
}

export function hasEnoughContrast(color1: string, color2: string): boolean {
  return chroma.contrast(color1, color2) > 4.5;
}

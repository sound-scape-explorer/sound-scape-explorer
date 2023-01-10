interface ConvertHexToRgba {
  r: number;
  g: number;
  b: number;
}

export function convertHexToRgba(hex: string): ConvertHexToRgba {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return {
    r,
    g,
    b,
  };
}

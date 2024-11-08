export function calculateMean(array: number[]): number {
  let sum = 0;

  for (const value of array) {
    sum += value;
  }

  return sum / array.length;
}

export function constrainValue(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(Math.max(value, min), max);
}

export function truncateNumber(number: number, decimals = 2): number {
  return Number(number.toFixed(decimals));
}

/**
 * Transpose a value with its current scale to a new scale
 * Inspired from processing/p5.js source code.
 *
 * @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L450
 */
export function mapRange(
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  isClamp = false,
): number {
  const value = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

  if (!isClamp) {
    return value;
  }

  if (start2 < stop2) {
    return constrainValue(value, start2, stop2);
  } else {
    return constrainValue(value, stop2, start2);
  }
}

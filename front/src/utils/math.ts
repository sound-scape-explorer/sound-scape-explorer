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

export function interpolate(
  start: number,
  end: number,
  size: number,
): number[] {
  if (size <= 0) {
    return [];
  }

  if (size === 1) {
    return [Math.round(start)];
  }

  const result: number[] = [];
  const step = (end - start) / (size - 1);

  for (let i = 0; i < size; i++) {
    result.push(start + step * i);
  }

  return result;
}

export function getDecimalPrecision(
  start: number,
  end: number,
  size: number,
): number {
  if (size <= 1) {
    return 0;
  }

  const step = Math.abs(end - start) / (size - 1);

  if (step >= 1) {
    return 0;
  }

  const startIsInt = Math.abs(start - Math.round(start)) < 1e-10;
  const endIsInt = Math.abs(end - Math.round(end)) < 1e-10;

  if (startIsInt && endIsInt) {
    return 0;
  }

  if (step >= 0.1) {
    return 1;
  }

  if (step >= 0.01) {
    return 2;
  }

  return 3;
}

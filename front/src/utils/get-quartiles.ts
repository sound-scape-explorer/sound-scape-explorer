import {quantile} from 'simple-statistics';

/**
 * @todo Will be migrated to the backend
 */
export function getQuartiles(rawData: number[]): number[] {
  const data = [...rawData].sort((a, b) => a - b);
  const n = data.length;

  const min = data[0];
  const max = data[n - 1];

  const q1 = quantile(data, 0.25);
  const q2 = quantile(data, 0.5);
  const q3 = quantile(data, 0.75);

  return [min, q1, q2, q3, max];
}

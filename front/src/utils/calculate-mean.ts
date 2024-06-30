export function calculateMean(arr: number[]): number {
  let sum = 0;

  for (let i = 0; i < arr.length; i += 1) {
    sum += arr[i];
  }

  return sum / arr.length;
}

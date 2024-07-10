export function truncateNumber(number: number, decimals = 2): number {
  return Number(number.toFixed(decimals));
}

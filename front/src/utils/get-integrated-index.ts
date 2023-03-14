export function getIntegratedIndex(index: number, filesLength: number): number {
  return Math.floor(index / filesLength) % filesLength;
}

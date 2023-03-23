export function getIntegratedIndex(index: number, filesLength: number): number {
  const length = filesLength + 1;
  return Math.floor(index / length) % length;
}

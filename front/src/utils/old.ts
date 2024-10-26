export function parseSelectionOption(
  optionString: string | null,
): number | null {
  if (optionString === null) {
    return null;
  }

  const stringElements = optionString.split(' ');
  return Number(stringElements[0]);
}

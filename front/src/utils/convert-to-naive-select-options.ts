export interface NaiveSelectOption {
  label: string;
  value: string;
}

export function convertToNaiveSelectOptions(
  options: string[],
): NaiveSelectOption[] {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
}

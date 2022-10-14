export function convertToNaiveDropdownOptions(options: string[]) {
  return options.map((option) => {
    return {
      label: option,
      key: option,
    };
  });
}

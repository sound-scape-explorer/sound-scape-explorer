import {type DropdownOption} from 'src/common/DropdownOption';

export function convertToNaiveSelectOptions(
  options: string[],
): DropdownOption[] {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
}

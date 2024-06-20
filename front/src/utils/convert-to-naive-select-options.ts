import type {SelectMixedOption} from 'naive-ui/es/select/src/interface';

export interface NaiveSelectOption {
  label: string;
  value: string;
}

export function convertToNaiveSelectOptions(
  options: string[],
): SelectMixedOption[] {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
}

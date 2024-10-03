import {type SelectMixedOption} from 'naive-ui/es/select/src/interface';

export function convertHashToNaiveOptions<T>(hash: T): SelectMixedOption[] {
  return Object.entries(hash).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });
}

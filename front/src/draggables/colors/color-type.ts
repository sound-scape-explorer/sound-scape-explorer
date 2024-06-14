import {useStorageLabels} from 'src/composables/storage-labels';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

export type ColorType =
  | 'intervalIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay';

export function useColorType() {
  const {labelProperties} = useStorageLabels();

  const options = computed(() => {
    const defaultOptions: ColorType[] = [
      'intervalIndex',
      'by1h',
      'by10min',
      'isDay',
      'cycleDay',
    ];

    if (labelProperties.value === null) {
      return convertToNaiveSelectOptions(defaultOptions);
    }

    const payload = [
      ...defaultOptions,
      ...convertSlugsToColorTypes(labelProperties.value),
    ];

    return convertToNaiveSelectOptions(payload);
  });

  return {
    options: options,
  };
}

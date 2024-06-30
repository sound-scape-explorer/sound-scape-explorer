import {useStorageLabels} from 'src/composables/use-storage-labels';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {computed} from 'vue';

export type ColorType =
  | 'intervalIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay';

export function useColorType() {
  const {labelProperties} = useStorageLabels();

  const options = computed<string[]>(() => {
    const defaultOptions: ColorType[] = [
      'intervalIndex',
      'by1h',
      'by10min',
      'isDay',
      'cycleDay',
    ];

    if (labelProperties.value === null) {
      return defaultOptions;
    }

    return [
      ...defaultOptions,
      ...convertSlugsToColorTypes(labelProperties.value),
    ];
  });

  return {
    options: options,
  };
}

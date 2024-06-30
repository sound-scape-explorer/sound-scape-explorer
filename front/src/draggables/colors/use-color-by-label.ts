import type {Scale} from 'chroma-js';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useLimitedColorScale} from 'src/draggables/colors/use-color-limited-scale';

export function useColorByLabel() {
  const {createLimitedColorScale} = useLimitedColorScale();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {labelPropertiesAsColorTypes} = useStorageLabels();
  const {labelSets} = useStorageLabels();

  const getColorByLabel = (
    intervalIndex: number,
    propertyAsColorType: string, // label property
    scale: Scale,
  ): string => {
    if (
      aggregatedLabels.value === null ||
      labelSets.value === null ||
      labelPropertiesAsColorTypes.value === null
    ) {
      throw new Error('getColorByLabel: missing props');
    }

    const propertyIndex =
      labelPropertiesAsColorTypes.value.indexOf(propertyAsColorType);

    const values = aggregatedLabels.value[intervalIndex];
    const value = values[propertyIndex];
    const possibleValues = labelSets.value[propertyIndex];

    const colors = createLimitedColorScale(possibleValues.length, scale);
    const index = possibleValues.indexOf(value);

    const [r, g, b] = colors[index];

    return `rgb(${r},${g},${b})`;
  };

  const getColorByLabelIndex = (
    index: number,
    length: number,
    scale: Scale,
  ): string => {
    const colors = createLimitedColorScale(length, scale);
    const [r, g, b] = colors[index];

    return `rgb(${r},${g},${b})`;
  };

  return {
    getColorByLabel: getColorByLabel,
    getColorByLabelIndex: getColorByLabelIndex,
  };
}

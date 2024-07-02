import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useColorUser} from 'src/composables/use-color-user';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useLimitedColorScale} from 'src/draggables/colors/use-color-limited-scale';

export function useColorByLabel() {
  const {createLimitedColorScale} = useLimitedColorScale();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {labelProperties} = useStorageLabels();
  const {labelSets} = useStorageLabels();
  const {criteria} = useColorSelection();
  const {scale} = useColorUser();

  const getColorByLabel = (intervalIndex: number): string => {
    if (
      aggregatedLabels.value === null ||
      labelProperties.value === null ||
      labelSets.value === null
    ) {
      throw new Error('getColorByLabel: missing props');
    }

    const propertyIndex = labelProperties.value.indexOf(criteria.value);

    const values = aggregatedLabels.value[intervalIndex];
    const value = values[propertyIndex];
    const possibleValues = labelSets.value[propertyIndex];

    const colors = createLimitedColorScale(possibleValues.length, scale.value);
    const index = possibleValues.indexOf(value);

    const [r, g, b] = colors[index];

    return `rgb(${r},${g},${b})`;
  };

  const getColorByLabelIndex = (index: number, length: number): string => {
    const colors = createLimitedColorScale(length, scale.value);
    const [r, g, b] = colors[index];
    return `rgb(${r},${g},${b})`;
  };

  return {
    getColorByLabel: getColorByLabel,
    getColorByLabelIndex: getColorByLabelIndex,
  };
}

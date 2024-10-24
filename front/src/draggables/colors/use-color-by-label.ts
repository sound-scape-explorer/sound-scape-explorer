import {useColorUser} from 'src/composables/use-color-user';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useColorResize} from 'src/draggables/colors/use-color-resize';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelNumeric} from 'src/draggables/labels/use-label-numeric';
import {convertRgbToString} from 'src/utils/convert-rgb-to-string';
import {getInfiniteRange} from 'src/utils/get-infinite-range';
import {mapRange} from 'src/utils/map-range';
import {ref} from 'vue';

const min = ref<number | null>(null);
const max = ref<number | null>(null);

export function useColorByLabel() {
  const {resize} = useColorResize();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {labelProperties} = useStorageLabels();
  const {labelSets} = useStorageLabels();
  const {criteria} = useColorSelection();
  const {scale} = useColorUser();
  const {isEnabled} = useLabelNumeric();

  const getPrimitive = (intervalIndex: number) => {
    if (
      aggregatedLabels.value === null ||
      labelProperties.value === null ||
      labelSets.value === null
    ) {
      throw new Error('useColorByLabel: missing props');
    }

    const p = labelProperties.value.indexOf(criteria.value);
    const values = aggregatedLabels.value[intervalIndex];
    const value = values[p];
    const set = labelSets.value[p];

    return {
      p: p,
      value: value,
      set: set,
    };
  };

  const getColorNumeric = (numeric: number) => {
    const {bottom, top} = getInfiniteRange(min.value, max.value);
    const ranged = mapRange(numeric, bottom, top, 0, 1);
    return scale.value(ranged).css();
  };

  const getColorNumericAll = (intervalIndex: number) => {
    const {value} = getPrimitive(intervalIndex);
    return getColorNumeric(Number(value));
  };

  const getColorCategory = (intervalIndex: number) => {
    const {value, set} = getPrimitive(intervalIndex);
    const colors = resize(scale.value, set.length);
    const index = set.indexOf(value);
    const color = colors[index];
    return convertRgbToString(color);
  };

  const get = (intervalIndex: number): string => {
    if (isEnabled.value) {
      return getColorNumericAll(intervalIndex);
    }

    return getColorCategory(intervalIndex);
  };

  const getColorByPropertyIndex = (p: number, length: number): string => {
    const colors = resize(scale.value, length);
    const color = colors[p];
    return convertRgbToString(color);
  };

  const detect = () => {
    if (aggregatedLabels.value === null) {
      return;
    }

    const {set} = getPrimitive(0);
    const values = set.map((v) => Number(v));

    min.value = Math.min(...values);
    max.value = Math.max(...values);
  };

  return {
    min: min,
    max: max,
    get: get,
    detect: detect,
    getColorByLabelIndex: getColorByPropertyIndex,
    getColorNumeric: getColorNumeric,
  };
}

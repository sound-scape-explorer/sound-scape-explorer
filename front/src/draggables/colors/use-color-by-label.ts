import {useColorUser} from 'src/composables/use-color-user';
import {useIntervals} from 'src/composables/use-intervals';
import {useLabelSets} from 'src/composables/use-label-sets';
import {useColorResize} from 'src/draggables/colors/use-color-resize';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelNumeric} from 'src/draggables/labels/use-label-numeric';
import {convertRgbToString} from 'src/utils/colors';
import {mapRange} from 'src/utils/math';
import {getInfiniteRange} from 'src/utils/utils';
import {ref} from 'vue';

const min = ref<number | null>(null);
const max = ref<number | null>(null);

export function useColorByLabel() {
  const {resize} = useColorResize();
  const {intervals} = useIntervals();
  const {sets} = useLabelSets();
  const {criteria} = useColorSelection();
  const {scale} = useColorUser();
  const {isEnabled} = useLabelNumeric();

  const getPrimitive = (intervalIndex: number) => {
    const labelProperties = Object.keys(sets.value);
    const labelSets = Object.values(sets.value);
    const interval = intervals.value[intervalIndex];

    const propertyIndex = labelProperties.indexOf(criteria.value);
    const values = interval.labels[criteria.value] as string[];
    const set = labelSets[propertyIndex];
    const value = values[0]; // todo: taking first for now, need fuse

    return {
      set,
      value,
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
    const {set} = getPrimitive(0);
    const values = set.map((v) => Number(v));

    min.value = Math.min(...values);
    max.value = Math.max(...values);
  };

  return {
    min,
    max,
    get,
    detect,
    getColorByLabelIndex: getColorByPropertyIndex,
    getColorNumeric,
  };
}

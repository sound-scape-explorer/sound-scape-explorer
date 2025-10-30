import {useColorUser} from 'src/composables/use-color-user';
import {useIntervals} from 'src/composables/use-intervals';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {STRING_DELIMITER} from 'src/constants';
import {useColorResize} from 'src/draggables/colors/use-color-resize';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {convertRgbToString} from 'src/utils/colors';
import {mapRange} from 'src/utils/math';
import {getInfiniteRange} from 'src/utils/utils';
import {ref} from 'vue';

const min = ref<number | null>(null);
const max = ref<number | null>(null);

export function useColorByTag() {
  const {resize} = useColorResize();
  const {intervals} = useIntervals();
  const {allUniques} = useTagUniques();
  const {option} = useColorSelection();
  const {scale} = useColorUser();
  const {isEnabled} = useTagNumeric();

  const getPrimitive = (intervalIndex: number) => {
    const interval = intervals.value[intervalIndex];
    const tagValue = interval.tags[option.value].join(STRING_DELIMITER);
    const tagUniques = allUniques.value[option.value];

    return {
      tagUniques,
      tagValue,
    };
  };

  const getColorNumeric = (numeric: number) => {
    const {bottom, top} = getInfiniteRange(min.value, max.value);
    const ranged = mapRange(numeric, bottom, top, 0, 1);
    return scale.value(ranged).css();
  };

  const getColorNumericAll = (intervalIndex: number) => {
    const {tagValue} = getPrimitive(intervalIndex);
    return getColorNumeric(Number(tagValue));
  };

  const getColorCategory = (intervalIndex: number) => {
    const {tagValue, tagUniques} = getPrimitive(intervalIndex);
    const colors = resize(scale.value, tagUniques.length);
    const index = tagUniques.indexOf(tagValue);
    const color = colors[index];
    return convertRgbToString(color);
  };

  const get = (intervalIndex: number): string => {
    if (isEnabled.value) {
      return getColorNumericAll(intervalIndex);
    }

    return getColorCategory(intervalIndex);
  };

  const getColorByTagIndex = (p: number, length: number): string => {
    const colors = resize(scale.value, length);
    const color = colors[p];
    return convertRgbToString(color);
  };

  const detect = () => {
    const {tagUniques} = getPrimitive(0);
    const values = tagUniques.map((v) => Number(v));

    min.value = Math.min(...values);
    max.value = Math.max(...values);
  };

  return {
    min,
    max,
    get,
    detect,
    getColorByTagIndex,
    getColorNumeric,
  };
}

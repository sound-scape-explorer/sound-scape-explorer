import {useColorUser} from 'src/composables/use-color-user';
import {useTagData} from 'src/composables/use-tag-data';
import {useColorResize} from 'src/draggables/colors/use-color-resize';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {convertRgbToString} from 'src/utils/colors';
import {mapRange} from 'src/utils/math';
import {getInfiniteRange} from 'src/utils/utils';

export function useColorByTag() {
  const {resize} = useColorResize();
  const {scale} = useColorUser();
  const {isNumericModeEnabled, numericRangeMin, numericRangeMax, option} =
    useColoringState();
  const {getTagPrimitive} = useTagData();

  const getColorNumeric = (numeric: number) => {
    const {bottom, top} = getInfiniteRange(
      Number(numericRangeMin.value),
      Number(numericRangeMax.value),
    );
    const ranged = mapRange(numeric, bottom, top, 0, 1);
    return scale.value(ranged).css();
  };

  const getColorNumericAll = (intervalIndex: number) => {
    const {tagValue} = getTagPrimitive(intervalIndex, option.value);
    return getColorNumeric(Number(tagValue));
  };

  const getColorCategory = (intervalIndex: number) => {
    const {tagValue, tagUniques} = getTagPrimitive(intervalIndex, option.value);
    const colors = resize(scale.value, tagUniques.length);
    const index = tagUniques.indexOf(tagValue);
    const color = colors[index];
    return convertRgbToString(color);
  };

  const get = (intervalIndex: number): string => {
    if (isNumericModeEnabled.value) {
      return getColorNumericAll(intervalIndex);
    }

    return getColorCategory(intervalIndex);
  };

  const getColorByTagIndex = (p: number, length: number): string => {
    const colors = resize(scale.value, length);
    const color = colors[p];
    return convertRgbToString(color);
  };

  return {
    get,
    getColorByTagIndex,
    getColorNumeric,
  };
}

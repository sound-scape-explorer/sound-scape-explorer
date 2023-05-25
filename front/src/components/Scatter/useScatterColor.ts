import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {datasetRef} from './useScatterDataset';
import {metaPropertiesAsColorTypesRef} from 'src/hooks/useStorageMetaProperties';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {useDate} from 'src/hooks/useDate';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {timeStore} from '../Time/timeStore';
import {mapRange} from 'src/utils/map-range';
import {useColors} from '../Colors/useColors';
import {colorsStore} from '../Colors/colorsStore';
import {useIndexes} from 'src/hooks/useIndexes';
import {isHourDuringDay} from 'src/utils/is-hour-during-day';
import {useScatterMeta} from './useScatterMeta';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {alphaLowRef, colorScaleRef} from './useScatterColorScale';
import {computed} from 'vue';

const hoverColor = 'red';

export function useScatterColor() {
  const {colors, nightColor, dayColor, cyclingColors} = useColors();
  const {convertTimestampToDate} = useDate();
  const {convertPointIndex} = useIndexes();
  const {getMetaColor} = useScatterMeta();

  console.log('useScatterColor');
  const filteredColorRef = computed<string>(
    () => `hsla(0, 0%, 0%, ${alphaLowRef.value})`,
  );

  const getColor = (
    index: number,
    selectedIndices: Set<number>,
    hoverIndex: number | null,
  ): string => {
    if (index === hoverIndex) {
      return hoverColor;
    }

    if (
      pointsFilteredByMetaRef.value === null ||
      colorScaleRef.value === null
    ) {
      return 'black';
    }

    const isFiltered = pointsFilteredByMetaRef.value[index];

    if (isFiltered) {
      return filteredColorRef.value;
    }

    return colorScaleRef.value[index];

    return 'blue';
    console.log('getColor');

    if (
      settingsRef.value === null ||
      datasetRef.value === null ||
      groupedTimestampsRef.value === null ||
      groupedMetasRef.value === null ||
      metaPropertiesAsColorTypesRef.value === null ||
      metaSetsRef.value === null
    ) {
      return filteredColor;
    }

    const isFilteredOut = shouldBeFiltered(index);
    if (isFilteredOut) {
      return filteredColor;
    }

    const timestamp = groupedTimestampsRef.value[index];
    const timezone = settingsRef.value.timezone;
    const date = convertTimestampToDate(timestamp, timezone);
    const range = {
      min: convertTimestampToDate(timeStore.min * 1000, timezone),
      max: convertTimestampToDate(timeStore.max * 1000, timezone),
    };

    const pointsLength = groupedTimestampsRef.value.length;
    const alphaHigh = scatterAlphasStore.high;

    const rangedPointIndex = mapRange(index, 0, pointsLength, 0, 1);

    const indexColor = colors.value(rangedPointIndex).alpha(alphaHigh).css();

    let color = indexColor;

    const colorType = colorsStore.colorType;

    if (colorType === 'fileIndex') {
      const [fileIndex] = convertPointIndex(index);
      const rangedFiledIndex = mapRange(fileIndex, 0, pointsLength, 0, 1);
      color = colors.value(rangedFiledIndex).alpha(alphaHigh).css();
    } else if (colorType === 'pointIndex') {
      color = indexColor;
    } else if (colorType === 'by1h') {
      const rangeInHours = range.max.diff(range.min, 'hours');
      const currentHourFromStart = date.diff(range.min, 'hours');
      const rangedIndex = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);
      color = colors.value(rangedIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'by10min') {
      const rangeInMinutes = range.max.diff(range.min, 'minutes');
      const currentMinuteFromStart = date.diff(range.min, 'minutes');
      const rangedIndex = mapRange(
        currentMinuteFromStart,
        0,
        rangeInMinutes,
        0,
        1,
      );

      color = colors.value(rangedIndex).alpha(scatterAlphasStore.high).css();
    } else if (colorType === 'isDay') {
      const hour = date.get('hours');
      const isDay = isHourDuringDay(hour);

      color = isDay
        ? dayColor.alpha(alphaHigh).css()
        : nightColor.alpha(alphaHigh).css();
    } else if (colorType === 'cycleDay') {
      const hour = date.get('hours');
      const rangedIndex = mapRange(hour, 0, 24, 0, 1);

      color = cyclingColors
        .value(rangedIndex)
        .alpha(scatterAlphasStore.high)
        .css();
    } else if (metaPropertiesAsColorTypesRef.value.includes(colorType)) {
      color = getMetaColor(colorType, index);
    }

    if (index === hoverIndex) {
      return hoverColor;
    }

    if (selectedIndices.size === 0) {
      return color;
    }

    const isSelected = selectedIndices.has(index);

    if (isSelected) {
      return color;
    }

    return filteredColor;
  };

  return {
    getColor: getColor,
  };
}

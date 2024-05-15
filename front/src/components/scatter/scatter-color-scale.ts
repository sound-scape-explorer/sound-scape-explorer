import chroma, {type Scale} from 'chroma-js';
import {useColorSelection} from 'src/components/scatter/color-selection';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageFiles} from 'src/composables/storage-files';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useColorBy1h} from 'src/draggables/colors/color-by-1h';
import {useColorBy10min} from 'src/draggables/colors/color-by-10min';
import {useColorByCyclingDay} from 'src/draggables/colors/color-by-cycling-day';
import {useColorByDay} from 'src/draggables/colors/color-by-day';
import {useColorByIntervalIndex} from 'src/draggables/colors/color-by-interval-index';
import {useColorByLabel} from 'src/draggables/colors/color-by-label';
import {computed, ref} from 'vue';

const scale = ref<string[] | null>(null);
const cyclingScale = computed<Scale>(() =>
  chroma
    .scale(['blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'blue'])
    .mode('hsl'),
);

export function useScatterColorScale() {
  const {files} = useStorageFiles();
  const {labelPropertiesAsColorTypes} = useStorageLabels();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {getColor} = useColorByIntervalIndex();
  const {getColorByOneHour} = useColorBy1h();
  const {getColorByTenMinutes} = useColorBy10min();
  const {getColorByDay} = useColorByDay();
  const {getColorByCyclingDay} = useColorByCyclingDay();
  const {getColorByLabel} = useColorByLabel();
  const {type, flavor} = useColorSelection();

  const userScale = computed<Scale>(() => {
    return chroma.scale(flavor.value).domain([0, 1]).mode('hsl');
  });

  const generate = async () => {
    return new Promise((resolve, reject) => {
      if (
        labelPropertiesAsColorTypes.value === null ||
        files.value === null ||
        aggregatedTimestamps.value === null
      ) {
        console.log({
          labelPropertiesAsColorTypes: labelPropertiesAsColorTypes,
          files: files,
          aggregatedTimestamps: aggregatedTimestamps,
        });
        reject(new Error('generateColorScale: missing props'));
        return;
      }

      // number of intervals
      const count = aggregatedTimestamps.value.length;
      const newScale = new Array(count);
      const isLabelProperty = labelPropertiesAsColorTypes.value.includes(
        type.value,
      );

      for (let i = 0; i < count; i += 1) {
        const timestamp = aggregatedTimestamps.value[i];

        if (isLabelProperty) {
          newScale[i] = getColorByLabel(i, type.value, userScale.value);
        } else if (type.value === 'intervalIndex') {
          newScale[i] = getColor(i, count, userScale.value);
        } else if (type.value === 'by1h') {
          newScale[i] = getColorByOneHour(timestamp, userScale.value);
        } else if (type.value === 'by10min') {
          newScale[i] = getColorByTenMinutes(timestamp, userScale.value);
        } else if (type.value === 'isDay') {
          newScale[i] = getColorByDay(timestamp);
        } else if (type.value === 'cycleDay') {
          newScale[i] = getColorByCyclingDay(timestamp, cyclingScale.value);
        }
      }

      scale.value = newScale;
      resolve(undefined);
    });
  };

  const reset = () => {
    scale.value = null;
  };

  return {
    scale: scale,
    userScale: userScale,
    cyclingScale: cyclingScale,
    generateColorScale: generate,
    resetColorScale: reset,
  };
}

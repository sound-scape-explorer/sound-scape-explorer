import {useFiles} from 'src/composables/use-files';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useColorBy1h} from 'src/draggables/colors/use-color-by-1h';
import {useColorBy10min} from 'src/draggables/colors/use-color-by-10min';
import {useColorByCyclingDay} from 'src/draggables/colors/use-color-by-cycling-day';
import {useColorByDay} from 'src/draggables/colors/use-color-by-day';
import {useColorByIndex} from 'src/draggables/colors/use-color-by-index';
import {useColorByIntervalIndex} from 'src/draggables/colors/use-color-by-interval-index';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {ref} from 'vue';

const scale = ref<string[] | null>(null);

export function useScatterColorScale() {
  const {files} = useFiles();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {isIndicators, isLabels} = useColorState();
  const {getColor} = useColorByIntervalIndex();
  const {getColorByOneHour} = useColorBy1h();
  const {getColorByTenMinutes} = useColorBy10min();
  const {getColorByDay} = useColorByDay();
  const {getColorByCyclingDay} = useColorByCyclingDay();
  const {get: getColorByLabel} = useColorByLabel();
  const {get: getColorByIndicator} = useColorByIndex();
  const {criteria} = useColorSelection();

  const generate = async () => {
    return new Promise((resolve, reject) => {
      if (files.value === null || aggregatedTimestamps.value === null) {
        reject(new Error('generateColorScale: missing props'));
        return;
      }

      // number of intervals
      const count = aggregatedTimestamps.value.length;
      const newScale: string[] = new Array(count);

      for (let i = 0; i < count; i += 1) {
        const timestamp = aggregatedTimestamps.value[i];

        if (isLabels.value) {
          newScale[i] = getColorByLabel(i);
        } else if (isIndicators.value) {
          newScale[i] = getColorByIndicator(i);
        } else {
          switch (criteria.value) {
            case 'cycleDay':
              newScale[i] = getColorByCyclingDay(timestamp);
              break;
            case 'intervalIndex':
              newScale[i] = getColor(i, count);
              break;
            case 'isDay':
              newScale[i] = getColorByDay(timestamp);
              break;
            case 'by1h':
              newScale[i] = getColorByOneHour(timestamp);
              break;
            case 'by10min':
              newScale[i] = getColorByTenMinutes(timestamp);
              break;
          }
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
    generateColorScale: generate,
    resetColorScale: reset,
  };
}

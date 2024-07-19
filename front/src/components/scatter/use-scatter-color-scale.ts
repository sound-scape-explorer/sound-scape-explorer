import {useFiles} from 'src/composables/use-files';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useColorBy1h} from 'src/draggables/colors/use-color-by-1h';
import {useColorBy10min} from 'src/draggables/colors/use-color-by-10min';
import {useColorByCyclingDay} from 'src/draggables/colors/use-color-by-cycling-day';
import {useColorByDay} from 'src/draggables/colors/use-color-by-day';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {useColorByIntervalIndex} from 'src/draggables/colors/use-color-by-interval-index';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {ref} from 'vue';

const scale = ref<string[] | null>(null);

export function useScatterColorScale() {
  const {files} = useFiles();
  const {labelPropertiesAsColorTypes} = useStorageLabels();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {getColor} = useColorByIntervalIndex();
  const {getColorByOneHour} = useColorBy1h();
  const {getColorByTenMinutes} = useColorBy10min();
  const {getColorByDay} = useColorByDay();
  const {getColorByCyclingDay} = useColorByCyclingDay();
  const {get: getColorByLabel} = useColorByLabel();
  const {get: getColorByIndicator} = useColorByIndicator();
  const {category, criteria} = useColorSelection();

  const generate = async () => {
    return new Promise((resolve, reject) => {
      if (
        labelPropertiesAsColorTypes.value === null ||
        files.value === null ||
        aggregatedTimestamps.value === null
      ) {
        reject(new Error('generateColorScale: missing props'));
        return;
      }

      // number of intervals
      const count = aggregatedTimestamps.value.length;
      const newScale: string[] = new Array(count);

      for (let i = 0; i < count; i += 1) {
        const timestamp = aggregatedTimestamps.value[i];

        switch (category.value) {
          case 'Labels':
            newScale[i] = getColorByLabel(i);
            break;
          case 'Indicators':
            newScale[i] = getColorByIndicator(i);
            break;
          case 'Default':
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
            break;
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

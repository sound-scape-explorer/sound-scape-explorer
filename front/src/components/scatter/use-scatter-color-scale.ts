import {useAggregations} from 'src/composables/use-aggregations';
import {useConfig} from 'src/composables/use-config';
import {ColorOption} from 'src/constants';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorByDayOrNight} from 'src/draggables/colors/use-color-by-day-or-night';
import {useColorByHoursInDay} from 'src/draggables/colors/use-color-by-hours-in-day';
import {useColorByIntervalIndex} from 'src/draggables/colors/use-color-by-interval-index';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {ref} from 'vue';

const scale = ref<string[] | null>(null);

export function useScatterColorScale() {
  const {config} = useConfig();
  const {aggregations} = useAggregations();
  const {isAcoustic, isTag} = useColorState();
  const {get: getColorByIntervalIndex} = useColorByIntervalIndex();
  const {get: getColorByDayOrNight} = useColorByDayOrNight();
  const {get: getColorByHoursInDay} = useColorByHoursInDay();
  const {get: getColorByTag} = useColorByTag();
  const {get: getColorByAcoustic} = useColorByAcoustic();
  const {option: colorOption} = useColorSelection();

  const generate = async () => {
    return new Promise((resolve, reject) => {
      if (config.value === null || aggregations.value === null) {
        reject(new Error('generateColorScale: missing props'));
        return;
      }

      // number of intervals
      const count = aggregations.value.timestamps.length;
      const newScale: string[] = new Array(count);

      for (let i = 0; i < count; i += 1) {
        const timestamp = aggregations.value.timestamps[i];

        if (isTag.value) {
          newScale[i] = getColorByTag(i);
        } else if (isAcoustic.value) {
          newScale[i] = getColorByAcoustic(i);
        } else {
          switch (colorOption.value) {
            case ColorOption.enum.HoursInDay:
              newScale[i] = getColorByHoursInDay(timestamp);
              break;
            case ColorOption.enum.IntervalIndex:
              newScale[i] = getColorByIntervalIndex(i, count);
              break;
            case ColorOption.enum.DayOrNight:
              newScale[i] = getColorByDayOrNight(timestamp);
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
    scale,
    generate,
    reset,
  };
}

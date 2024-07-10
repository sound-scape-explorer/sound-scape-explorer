import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorUser} from 'src/composables/use-color-user';
import {createHourlyLabels} from 'src/utils/create-hourly-labels';
import {computed} from 'vue';

const size = 100;

export function useColorGradients() {
  const {scale, cyclingScale} = useScatterColorScale();
  const {scale: userScale} = useColorUser();
  const {isColorMapSwapped} = useClientSettings();

  const cycleDayColors = computed<string[]>(() =>
    cyclingScale.value.colors(size),
  );
  const cycleDayLabels = computed<string[]>(() => createHourlyLabels(size));

  const dayColors = computed(() => {
    const uniques = [...new Set(scale.value)];
    const sorted = uniques.toSorted((a, b) => a.localeCompare(b));
    return sorted;
  });

  const userColors = computed<string[]>(() => {
    const array = userScale.value.colors(size);

    if (isColorMapSwapped.value) {
      return array.reverse();
    }

    return array;
  });

  return {
    cycleDayColors: cycleDayColors,
    cycleDayLabels: cycleDayLabels,
    dayColors: dayColors,
    userColors: userColors,
  };
}

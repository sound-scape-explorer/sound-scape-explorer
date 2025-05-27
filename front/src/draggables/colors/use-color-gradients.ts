import {useAppGradient} from 'src/components/scatter/use-app-gradient';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorUser} from 'src/composables/use-color-user';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {computed} from 'vue';

const size = 100;

export function useColorGradients() {
  const {scale} = useScatterColorScale();
  const {scale: cyclingScale} = useColorsCycling();
  const {scale: userScale} = useColorUser();
  const {isColorMapSwapped} = useClientSettings();
  const {getLabels, getLegendLabels} = useAppGradient();

  const cycleDayColors = computed<string[]>(() =>
    cyclingScale.value.colors(size),
  );
  const cycleDayLabels = computed<string[]>(() => getLabels(size));
  const cycleDayLegend = computed(() => getLegendLabels());

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
    cycleDayColors,
    cycleDayLabels,
    cycleDayLegend,
    dayColors,
    userColors,
  };
}

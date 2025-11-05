import {useAppGradient} from 'src/components/scatter/use-app-gradient';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorScaleHoursInDay} from 'src/composables/use-color-scale-hours-in-day';
import {useColorUser} from 'src/composables/use-color-user';
import {computed} from 'vue';

const size = 100;

export function useColorGradients() {
  const {scale: hoursInDayScale} = useColorScaleHoursInDay();
  const {scale: userScale} = useColorUser();
  const {isColorMapSwapped} = useClientSettings();
  const {getLabels, getLegendLabels} = useAppGradient();

  const hoursInDayColors = computed<string[]>(() =>
    hoursInDayScale.value.colors(size),
  );
  const hoursInDayLabels = computed<string[]>(() => getLabels(size));
  const hoursInDayLegend = computed(() => getLegendLabels());

  const userColors = computed<string[]>(() => {
    const array = userScale.value.colors(size);

    if (isColorMapSwapped.value) {
      return array.reverse();
    }

    return array;
  });

  return {
    hoursInDayColors,
    hoursInDayLabels,
    hoursInDayLegend,
    userColors,
  };
}

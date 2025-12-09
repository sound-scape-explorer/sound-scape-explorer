import {useAppGradient} from 'src/components/scatter/use-app-gradient';
import {useAcousticRange} from 'src/composables/use-acoustic-range';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorScaleHoursInDay} from 'src/composables/use-color-scale-hours-in-day';
import {useColorUser} from 'src/composables/use-color-user';
import {useIntervals} from 'src/composables/use-intervals';
import {ColorCategory, ColorOption} from 'src/constants';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {getDecimalPrecision, interpolate, mapRange} from 'src/utils/math';
import {computed, ref} from 'vue';

const size = 100;
const labels = ref<string[]>([]);

export function useColorGradients() {
  const {option, category} = useColorSelection();
  const {isTagNumeric} = useColorState();
  const {isEnabled: isTagNumericEnabled} = useTagNumeric();
  const {intervals} = useIntervals();
  const {scale: hoursInDayScale} = useColorScaleHoursInDay();
  const {scale: userScale} = useColorUser();
  const {isColorMapSwapped} = useClientSettings();
  const {getLabels, getLegendLabels} = useAppGradient();
  const {min: tagMin, max: tagMax, detect: detectTagRange} = useColorByTag();
  const {min: acousticMin, max: acousticMax} = useColorByAcoustic();
  const {detect: detectAcousticRange} = useAcousticRange();

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

  const rangeToIntegerStrings = (
    range: number[],
    precision: number = 0,
  ): string[] => {
    return range.map((n) => n.toFixed(precision));
  };

  const updateLabels = () => {
    // default
    if (
      category.value === ColorCategory.enum.DEFAULT &&
      option.value === ColorOption.enum.IntervalIndex
    ) {
      const indices = intervals.value.map((_, i) => i);
      const indexMax = Math.max(...indices);
      const range = indices.map((i) => mapRange(i, 0, size, 0, indexMax));
      labels.value = rangeToIntegerStrings(range);
    }

    // tags
    if (
      category.value === ColorCategory.enum.TAGS &&
      isTagNumeric.value &&
      isTagNumericEnabled.value
    ) {
      const start = Number(tagMin.value);
      const end = Number(tagMax.value);
      const precision = getDecimalPrecision(start, end, size);
      const range = interpolate(start, end, size);
      labels.value = rangeToIntegerStrings(range, precision);
    }

    // acoustics
    if (category.value === ColorCategory.enum.ACOUSTICS) {
      const start = Number(acousticMin.value);
      const end = Number(acousticMax.value);
      const precision = getDecimalPrecision(start, end, size);
      const range = interpolate(start, end, size);
      labels.value = rangeToIntegerStrings(range, precision);
    }
  };

  return {
    hoursInDayColors,
    hoursInDayLabels,
    hoursInDayLegend,
    userColors,
    updateLabels,
    labels,
  };
}

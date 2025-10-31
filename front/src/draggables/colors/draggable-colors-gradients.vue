<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {ColorOption} from 'src/constants';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {computed} from 'vue';

const {option} = useColorSelection();
const {isEnabled: isNumeric} = useTagNumeric();
const {min, max} = useColorByTag();

const {cycleDayLabels, cycleDayColors, userColors, dayColors, cycleDayLegend} =
  useColorGradients();

const isHoursInDay = computed(
  () => option.value === ColorOption.enum.HoursInDay,
);

const isDayOrNight = computed(
  () => option.value === ColorOption.enum.DayOrNight,
);

// todo: check if v-else works as intended

const userLabels = computed<string[]>(() => {
  if (!isNumeric.value || min.value === null || max.value === null) {
    return [];
  }

  const size = userColors.value.length;

  const labels: string[] = [];

  for (let i = 0; i < size; i += 1) {
    const value = min.value + (i * (max.value - min.value)) / (size - 1);
    const int = Math.round(value);
    labels.push(int.toString());
  }

  return labels;
});
</script>

<template>
  <AppGradient
    v-if="isHoursInDay"
    :colors="cycleDayColors"
    :labels="cycleDayLabels"
    :legend-max="cycleDayLegend.max"
    :legend-med="cycleDayLegend.med"
    :legend-min="cycleDayLegend.min"
  />

  <AppGradient
    v-if="isDayOrNight"
    :colors="dayColors"
    :labels="['night', 'day']"
    :width="50"
    legend-max="day"
    legend-min="night"
  />

  <AppGradient
    v-else
    :colors="userColors"
    :labels="userLabels"
  />
</template>

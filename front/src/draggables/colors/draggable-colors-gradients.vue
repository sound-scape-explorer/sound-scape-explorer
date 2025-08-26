<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {computed} from 'vue';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';

const {criteria} = useColorSelection();
const {isEnabled: isNumeric} = useTagNumeric();
const {min, max} = useColorByTag();

const {cycleDayLabels, cycleDayColors, userColors, dayColors, cycleDayLegend} =
  useColorGradients();

const isPreset = computed(() => {
  return criteria.value === 'cycleDay' || criteria.value === 'isDay';
});

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
    v-if="criteria === 'cycleDay'"
    :colors="cycleDayColors"
    :labels="cycleDayLabels"
    :legend-max="cycleDayLegend.max"
    :legend-med="cycleDayLegend.med"
    :legend-min="cycleDayLegend.min"
  />

  <AppGradient
    v-if="criteria === 'isDay'"
    :colors="dayColors"
    :labels="['night', 'day']"
    :width="50"
    legend-max="day"
    legend-min="night"
  />

  <AppGradient
    v-if="!isPreset"
    :colors="userColors"
    :labels="userLabels"
  />
</template>

<script lang="ts" setup>
import AppGradient from 'src/components/app/app-gradient.vue';
import {createHourlyLabels} from 'src/utils/create-hourly-labels';
import {computed} from 'vue';

import {colorScaleRef, cyclingScaleRef} from '../Scatter/useScatterColorScale';
import {colorsStore} from './colorsStore';

const size = 100;

const isCycleDay = computed(() => colorsStore.colorType === 'cycleDay');
const isCycleDayColors = computed<string[]>(() =>
  cyclingScaleRef.value.colors(size),
);
const isCycleDayLabels = computed<string[]>(() => createHourlyLabels(size));

const isDay = computed(() => colorsStore.colorType === 'isDay');
const isDayColors = computed(() => {
  if (!isDay.value) {
    return [];
  }

  const colors = [...new Set(colorScaleRef.value)];
  const sortedColors = colors.sort((a, b) => a.localeCompare(b));
  return sortedColors;
});
</script>

<template>
  <AppGradient
    v-if="isCycleDay"
    :colors="isCycleDayColors"
    :labels="isCycleDayLabels"
    legend-max="00:00"
    legend-med="12:00"
    legend-min="00:00"
  />
  <AppGradient
    v-if="isDay"
    :colors="isDayColors"
    :labels="['night', 'day']"
    :width="50"
    legend-max="day"
    legend-min="night"
  />
</template>

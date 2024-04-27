<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useColorSelection} from 'src/scatter/color-selection';
import {useScatterColorScale} from 'src/scatter/scatter-color-scale';
import {createHourlyLabels} from 'src/utils/create-hourly-labels';
import {computed} from 'vue';

const {scale, userScale, cyclingScale} = useScatterColorScale();
const {type} = useColorSelection();

const size = 100;

const isCycleDay = computed(() => type.value === 'cycleDay');
const isCycleDayColors = computed<string[]>(() =>
  cyclingScale.value.colors(size),
);
const isCycleDayLabels = computed<string[]>(() => createHourlyLabels(size));

const isDay = computed(() => type.value === 'isDay');
const isDayColors = computed(() => {
  if (!isDay.value) {
    return [];
  }

  const uniques = [...new Set(scale.value)];
  const sorted = uniques.sort((a, b) => a.localeCompare(b));
  return sorted;
});

const isUser = computed(() => !isCycleDay.value && !isDay.value);
const isUserColors = computed<string[]>(() => {
  return userScale.value.colors(size);
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
  <AppGradient
    v-if="isUser"
    :colors="isUserColors"
  />
</template>

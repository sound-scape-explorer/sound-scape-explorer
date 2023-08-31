<script lang="ts" setup>
import AppGradient from 'src/components/AppGradient/AppGradient.vue';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import {computed} from 'vue';

const size = 100;

const cyclingScale = computed<string[]>(() =>
  cyclingScaleRef.value.colors(size),
);

const labels = computed<string[]>(() => {
  const dates = [];
  const totalDuration = 24 * 60 * 60 * 1000; // The number of milliseconds during a day
  const interval = totalDuration / size;

  const referenceDate = new Date('1970-01-01T00:00:00');

  for (let i = 0; i < size; i++) {
    const currentDate = new Date(referenceDate.getTime() + i * interval);
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const date = `${hours}:${minutes}`;
    dates.push(date);
  }

  return dates;
});
</script>

<template>
  <AppGradient
    :colors="cyclingScale"
    :labels="labels"
    legend-max="00:00"
    legend-med="12:00"
    legend-min="00:00"
  />
</template>

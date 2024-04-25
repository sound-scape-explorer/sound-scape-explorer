<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {cyclingScaleRef} from 'src/scatter/scatter-color-scale';
import {createHourlyLabels} from 'src/utils/create-hourly-labels';
import {computed} from 'vue';

const size = 100;

const cyclingScale = computed<string[]>(() =>
  cyclingScaleRef.value.colors(size),
);

const labels = computed<string[]>(() => createHourlyLabels(size));
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

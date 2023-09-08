<script lang="ts" setup>
import {createHourlyLabels} from 'src/utils/create-hourly-labels';
import {computed} from 'vue';

import {cyclingScaleRef} from '.././Scatter/useScatterColorScale';
import AppGradient from '../AppGradient/AppGradient.vue';
import {colorsStore} from './colorsStore';

const size = 100;

const cyclingScale = computed<string[]>(() =>
  cyclingScaleRef.value.colors(size),
);
const isCycleDay = computed(() => colorsStore.colorType === 'cycleDay');
const labels = computed<string[]>(() => createHourlyLabels(size));
</script>

<template>
  <AppGradient
    v-if="isCycleDay"
    :colors="cyclingScale"
    :labels="labels"
    legend-max="00:00"
    legend-med="12:00"
    legend-min="00:00"
  />
</template>

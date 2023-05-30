<script lang="ts" setup="">
import {computed} from 'vue';
import AppGradient from '../AppGradient/AppGradient.vue';
import {colorsStore} from './colorsStore';
import {chromaScaleRef, cyclingScaleRef} from '../Scatter/useScatterColorScale';

const size = 100;

const scale = computed<string[]>(() => chromaScaleRef.value.colors(size));
const cyclingScale = computed<string[]>(() =>
  cyclingScaleRef.value.colors(size),
);
const isCycleDay = computed(() => colorsStore.colorType === 'cycleDay');
</script>

<template>
  <AppGradient
    v-if="!isCycleDay"
    :colors="scale"
  />

  <AppGradient
    v-if="isCycleDay"
    :colors="cyclingScale"
    legend-max="00:00"
    legend-med="12:00"
    legend-min="00:00"
  />
</template>

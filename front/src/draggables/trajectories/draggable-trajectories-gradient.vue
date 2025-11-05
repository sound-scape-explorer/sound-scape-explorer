<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useAppGradient} from 'src/components/scatter/use-app-gradient';
import {useScatterTrajectoryCyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useColorScaleHoursInDay} from 'src/composables/use-color-scale-hours-in-day';
import {computed} from 'vue';

const {scale: hoursInDayScale} = useColorScaleHoursInDay();
const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();
const {getLegendLabels, getLabels} = useAppGradient();

const size = 100;
const scale = computed<string[]>(() => hoursInDayScale.value.colors(size));
const labels = computed<string[]>(() => getLabels(size, cyclingPeriod.value));
const legend = computed(() => getLegendLabels(cyclingPeriod.value));
</script>

<template>
  <AppGradient
    :colors="scale"
    :labels="labels"
    :legend-max="legend.max"
    :legend-med="legend.med"
    :legend-min="legend.min"
  />
</template>

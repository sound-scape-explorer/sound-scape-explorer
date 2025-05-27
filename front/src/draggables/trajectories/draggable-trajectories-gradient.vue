<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useAppGradient} from 'src/components/scatter/use-app-gradient';
import {useScatterTrajectoryCyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {computed} from 'vue';

const {scale: cyclingScale} = useColorsCycling();
const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();
const {getLegendLabels, getLabels} = useAppGradient();

const size = 100;
const scale = computed<string[]>(() => cyclingScale.value.colors(size));
const labels = computed<string[]>(() => getLabels(size, cyclingPeriod.value));
const legendProps = computed(() => getLegendLabels(cyclingPeriod.value));
</script>

<template>
  <AppGradient
    :colors="scale"
    :labels="labels"
    :legend-max="legendProps.max"
    :legend-med="legendProps.med"
    :legend-min="legendProps.min"
  />
</template>

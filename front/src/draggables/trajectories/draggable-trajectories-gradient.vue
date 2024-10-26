<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {createHourlyLabels} from 'src/utils/colors';
import {computed} from 'vue';

const {scale: cyclingScale} = useColorsCycling();

const size = 100;
const scale = computed<string[]>(() => cyclingScale.value.colors(size));
const labels = computed<string[]>(() => createHourlyLabels(size));
</script>

<template>
  <AppGradient
    :colors="scale"
    :labels="labels"
    legend-max="00:00"
    legend-med="12:00"
    legend-min="00:00"
  />
</template>

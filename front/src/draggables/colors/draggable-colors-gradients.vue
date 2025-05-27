<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {computed} from 'vue';

const {criteria} = useColorSelection();

const {cycleDayLabels, cycleDayColors, userColors, dayColors, cycleDayLegend} =
  useColorGradients();

const isElse = computed(() => {
  return criteria.value !== 'cycleDay' && criteria.value !== 'isDay';
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
    v-if="isElse"
    :colors="userColors"
  />
</template>

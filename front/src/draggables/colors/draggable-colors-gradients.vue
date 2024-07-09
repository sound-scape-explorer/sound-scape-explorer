<script lang="ts" setup>
import AppGradient from 'src/app/app-gradient.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {computed} from 'vue';

const {criteria} = useColorSelection();

const {cycleDayLabels, cycleDayColors, userColors, dayColors} =
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
    legend-max="00:00"
    legend-med="12:00"
    legend-min="00:00"
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

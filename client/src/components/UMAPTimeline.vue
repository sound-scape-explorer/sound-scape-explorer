<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NCheckbox, NSlider} from 'naive-ui';
import {UMAPStore} from '../store/UMAP.store';

/**
 * State
 */

const min = ref();
const max = ref();
const isAll = ref(true);
const range = ref([min.value, max.value]);
const steps = ref({});

/**
 * Handlers
 */

function updateAll(nextValue: boolean) {
  isAll.value = nextValue;
}

function updateSteps() {
  if (!UMAPStore.data) {
    return;
  }

  const timestamps = UMAPStore.data.t;

  interface Steps {
    [date: string]: number;
  }

  const object: Steps = {};

  timestamps.forEach((timestamp) => {
    if (typeof object[timestamp] !== 'undefined') {
      return;
    }

    object[timestamp] = timestamp;
  });

  steps.value = object;
  min.value = object[Object.keys(object)[0]];
  max.value = object[Object.keys(object)[Object.keys(object).length - 1]];
  range.value = [min.value, max.value];

  console.log({
    steps,
    min,
    max,
    range,
  });
}

/**
 * Lifecycles
 */

watch(UMAPStore, () => {
  updateSteps();
});
</script>

<template>
  <n-checkbox
      v-model:checked="isAll"
      label="All"
      @update:checked="updateAll"
  />
  <n-slider
      v-model:value="range"
      :disabled="isAll"
      :marks="steps"
      :max="max"
      :min="min"
      :tooltip="false"
      range
      step="mark"
  />
</template>

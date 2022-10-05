<script lang="ts" setup>
import {ref} from 'vue';
import {NCheckbox, NSlider} from 'naive-ui';

/**
 * Props
 */

const min = 0;
const max = 100;

/**
 * State
 */

const isAll = ref(true);

const range = ref([min, max]);

const steps = ref({
  [min]: 'Start',
  34: 'Amazing',
  75: 'Good',
  [max]: 'End',
});

/**
 * Handlers
 */

function update(nextValue: boolean) {
  isAll.value = nextValue;
}
</script>

<template>
  <n-checkbox
      v-model:checked="isAll"
      label="All"
      @update:checked="update"
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

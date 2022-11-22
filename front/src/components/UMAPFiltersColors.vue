<script lang="ts" setup>
import {computed, ref} from 'vue';
import {NSelect} from 'naive-ui';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';

/**
 * State
 */

const options = ref<string[]>([
  'labelIndex',
  'pointIndex',
  'hour',
  'isDay',
]);

const naiveOptions = computed(() => {
  return options.value.map((option) => ({
    label: option,
    value: option,
  }));
});
</script>

<template>
  <n-select
      v-model:value="UMAPFiltersStore.colorType"
      :options="naiveOptions"
      default-value="labelIndex"
      placeholder="Color by..."
  ></n-select>
</template>

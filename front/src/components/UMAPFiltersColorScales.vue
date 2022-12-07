<script lang="ts" setup>
import {computed, ref} from 'vue';
import {NSelect} from 'naive-ui';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';

const options = ref<string[]>([
  'Accent',
  'Dark2',
  'Spectral',
]);

const naiveOptions = computed(() => {
  return options.value.map((option) => ({
    label: option, value: option,
  }));
});
</script>

<template>
  <n-select
      v-model:value="UMAPFiltersStore.colorScale"
      :options="naiveOptions"
      default-value="Dark2"
      placeholder="Color scale..."
  />
</template>

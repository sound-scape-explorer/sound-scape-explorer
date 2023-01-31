<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {computed, ref} from 'vue';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

const {isDisabled} = useUMAPStatus();

const options = ref<string[]>([
  'Accent',
  'Dark2',
  'Spectral',
]);

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));
</script>

<template>
  <n-tooltip placement="top" trigger="hover">
    <template #trigger>
      <n-select
          v-model:value="UMAPFiltersStore.colorScale"
          :disabled="isDisabled"
          :options="naiveOptions"
          default-value="Dark2"
          placeholder="Color scale..."
          size="tiny"
      />
    </template>
    <span>Color scale</span>
  </n-tooltip>
</template>

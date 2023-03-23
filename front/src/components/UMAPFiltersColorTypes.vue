<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {computed} from 'vue';
import {useStorage} from '../composables/useStorage';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import type {UMAPFiltersColorType} from '../store/UMAP-filters.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {convertColumnsToColorTypes} from '../utils/convert-columns-to-color-types';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

/**
 * State
 */

const {isDisabled} = useUMAPStatus();

const {getStorageMetas} = await useStorage();
const metas = await getStorageMetas();
const metaProperties = Object.keys(metas);

const options = computed<UMAPFiltersColorType[]>(() => {
  return [
    'labelIndex',
    'pointIndex',
    'by1h',
    'by10min',
    'isDay',
    'cycleDay',
    ...convertColumnsToColorTypes(metaProperties),
  ];
});

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <n-select
          v-model:value="UMAPFiltersStore.colorType"
          :disabled="isDisabled"
          :options="naiveOptions"
          default-value="labelIndex"
          placeholder="Color type..."
          size="tiny"
      />
    </template>
    <span>Color by</span>
  </n-tooltip>
</template>

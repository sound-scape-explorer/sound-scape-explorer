<script lang="ts" setup>
import {computed} from 'vue';
import {NSelect} from 'naive-ui';
import type {UMAPFiltersColorType} from '../store/UMAP-filters.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {useConfig} from '../composables/useConfig';
import {convertColumnsToColorTypes} from '../utils/convert-columns-to-color-types';

/**
 * State
 */

const {isDisabled} = useUMAPStatus();
const {columnsNames} = await useConfig();

const options = computed<UMAPFiltersColorType[]>(() => {
  if (!columnsNames) {
    return [];
  }

  return [
    'labelIndex',
    'pointIndex',
    'by1h',
    'by10min',
    'isDay',
    ...convertColumnsToColorTypes(columnsNames),
  ];
});

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));
</script>

<template>
  <n-select
      v-model:value="UMAPFiltersStore.colorType"
      :disabled="isDisabled"
      :options="naiveOptions"
      default-value="labelIndex"
      placeholder="Color type..."
  />
</template>

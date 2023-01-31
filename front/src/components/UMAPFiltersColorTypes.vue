<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {computed} from 'vue';
import {useUMAPMeta} from '../composables/useUMAPMeta';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import type {UMAPFiltersColorType} from '../store/UMAP-filters.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

/**
 * State
 */

const {isDisabled} = useUMAPStatus();
const {getMetaPropertiesAsColorTypes} = useUMAPMeta();

const options = computed<UMAPFiltersColorType[]>(() => {
  return [
    'labelIndex',
    'pointIndex',
    'by1h',
    'by10min',
    'isDay',
    ...getMetaPropertiesAsColorTypes(),
  ];
});

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));
</script>

<template>
  <n-tooltip placement="top" trigger="hover">
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

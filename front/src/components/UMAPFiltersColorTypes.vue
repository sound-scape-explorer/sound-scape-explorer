<script lang="ts" setup>
import {computed} from 'vue';
import {NSelect} from 'naive-ui';
import type {UMAPFiltersColorType} from '../store/UMAP-filters.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {useUMAPMeta} from '../composables/useUMAPMeta';

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
  <n-select
      v-model:value="UMAPFiltersStore.colorType"
      :disabled="isDisabled"
      :options="naiveOptions"
      default-value="labelIndex"
      placeholder="Color type..."
  />
</template>

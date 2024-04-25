<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

import {scatterLoadingRef} from '../Scatter/useScatterLoading';
import type {ColorType} from './colorsStore';
import {colorsStore} from './colorsStore';

const {labelsProperties} = useStorageLabels();

const optionsRef = computed<string[]>(() => {
  const defaultOptions: ColorType[] = [
    'intervalIndex',
    'by1h',
    'by10min',
    'isDay',
    'cycleDay',
  ];

  if (labelsProperties.value === null) {
    return defaultOptions;
  }

  return [
    ...defaultOptions,
    ...convertSlugsToColorTypes(labelsProperties.value),
  ];
});

const naiveOptions = computed(() => {
  const options = optionsRef.value;
  return convertToNaiveSelectOptions(options);
});
</script>

<template>
  <n-tooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <n-select
        v-model:value="colorsStore.colorType"
        :disabled="scatterLoadingRef.value"
        :options="naiveOptions"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </n-tooltip>
</template>

<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {computed} from 'vue';
import {convertSlugsToColorTypes} from '../../utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import type {ColorType} from './colorsStore';
import {colorsStore} from './colorsStore';
import {scatterReadyRef} from '../Scatter/useScatterReady';

/**
 * State
 */

const optionsRef = computed<ColorType[]>(() => {
  const defaultOptions = [
    'pointIndex',
    'fileIndex',
    'groupIndex',
    'by1h',
    'by10min',
    'isDay',
    'cycleDay',
  ];

  if (metaPropertiesRef.value === null) {
    return defaultOptions;
  }

  return [
    ...defaultOptions,
    ...convertSlugsToColorTypes(metaPropertiesRef.value),
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
        :default-value="optionsRef[0]"
        :disabled="!scatterReadyRef.value"
        :options="naiveOptions"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </n-tooltip>
</template>

<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {computed} from 'vue';
import {useStorage} from '../../storage/useStorage';
import {convertSlugsToColorTypes} from '../../utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import {useScatterStatus} from '../Scatter/useScatterStatus';
import type {ColorType} from './colorsStore';
import {colorsStore} from './colorsStore';

const {isDisabled} = useScatterStatus();
const {metaPropertiesRef} = await useStorage();

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

  const metaProperties = metaPropertiesRef.value;
  if (metaProperties === null) {
    return defaultOptions;
  }

  return [...defaultOptions, ...convertSlugsToColorTypes(metaProperties)];
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
        :disabled="isDisabled"
        :options="naiveOptions"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </n-tooltip>
</template>

<script lang="ts" setup>
import {asyncComputed} from '@vueuse/core';
import {NSelect, NTooltip} from 'naive-ui';
import {computed} from 'vue';
import {useStorage} from '../../hooks/useStorage';
import {convertSlugsToColorTypes} from '../../utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import {useScatterStatus} from '../Scatter/useScatterStatus';
import {selectionStore} from '../Selection/selectionStore';
import type {ColorType} from './colorsStore';
import {colorsStore} from './colorsStore';

const {isDisabled} = useScatterStatus();
const {getStorageMetas} = await useStorage();

/**
 * State
 */

const metas = asyncComputed(async () => {
  if (!selectionStore.band || !selectionStore.integration) {
    return;
  }

  return await getStorageMetas(selectionStore.band, selectionStore.integration);
});

const metaProperties = computed(() => Object.keys(metas.value ?? {}));

const options = computed<ColorType[]>(() => {
  return [
    'pointIndex',
    'fileIndex',
    'groupIndex',
    'by1h',
    'by10min',
    'isDay',
    'cycleDay',
    ...convertSlugsToColorTypes(metaProperties.value),
  ];
});

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));
</script>

<template>
  <n-tooltip placement="right" trigger="hover">
    <template #trigger>
      <n-select
        v-model:value="colorsStore.colorType"
        :default-value="options[0]"
        :disabled="isDisabled"
        :options="naiveOptions"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </n-tooltip>
</template>

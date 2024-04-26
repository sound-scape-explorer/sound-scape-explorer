<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import type {ColorType} from 'src/draggables/colors/colors-store';
import {colorsStore} from 'src/draggables/colors/colors-store';
import {scatterLoadingRef} from 'src/scatter/scatter-loading';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

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
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <NSelect
        v-model:value="colorsStore.colorType"
        :disabled="scatterLoadingRef.value"
        :options="naiveOptions"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </NTooltip>
</template>

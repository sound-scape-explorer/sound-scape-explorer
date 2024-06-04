<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import type {ColorType} from 'src/draggables/colors/color-type';
import {useColorSelection} from 'src/components/scatter/color-selection';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const {labelProperties} = useStorageLabels();
const {isLoading} = useScatterLoading();
const {type} = useColorSelection();

// todo: refactor me
const optionsRef = computed<string[]>(() => {
  const defaultOptions: ColorType[] = [
    'intervalIndex',
    'by1h',
    'by10min',
    'isDay',
    'cycleDay',
  ];

  if (labelProperties.value === null) {
    return defaultOptions;
  }

  return [
    ...defaultOptions,
    ...convertSlugsToColorTypes(labelProperties.value),
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
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NSelect
        v-model:value="type"
        :disabled="isLoading"
        :options="naiveOptions"
        placeholder="Color type..."
        size="small"
      />
    </template>
    <span>Color by</span>
  </NTooltip>
</template>

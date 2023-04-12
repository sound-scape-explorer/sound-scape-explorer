<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {computed} from 'vue';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import {useScatterStatus} from '../Scatter/useScatterStatus';
import {colorsStore} from './colorsStore';

const {isDisabled} = useScatterStatus();

const options = [
  'Accent',
  'Dark2',
  'Spectral',
];

const naiveOptions = computed(() => convertToNaiveSelectOptions(options));
</script>

<template>
  <n-tooltip placement="right" trigger="hover">
    <template #trigger>
      <n-select
        v-model:value="colorsStore.colorScale"
        :default-value="options[1]"
        :disabled="isDisabled"
        :options="naiveOptions"
        placeholder="Color scale..."
        size="small"
      />
    </template>
    <span>Color scale</span>
  </n-tooltip>
</template>

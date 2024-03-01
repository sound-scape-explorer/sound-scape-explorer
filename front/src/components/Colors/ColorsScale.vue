<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

import {scatterLoadingRef} from '../Scatter/useScatterLoading';
import {colorsStore} from './colorsStore';

const options = ['Accent', 'Dark2', 'Spectral'];

const naiveOptions = computed(() => convertToNaiveSelectOptions(options));
</script>

<template>
  <n-tooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <n-select
        v-model:value="colorsStore.colorScale"
        :default-value="options[1]"
        :disabled="scatterLoadingRef.value"
        :options="naiveOptions"
        placeholder="Color scale..."
        size="small"
      />
    </template>
    <span>Color scale</span>
  </n-tooltip>
</template>

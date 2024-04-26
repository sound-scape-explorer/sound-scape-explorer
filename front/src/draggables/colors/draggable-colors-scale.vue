<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {colorsStore} from 'src/draggables/colors/colors-store';
import {scatterLoadingRef} from 'src/scatter/scatter-loading';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const options = ['Accent', 'Dark2', 'Spectral'];

const naiveOptions = computed(() => convertToNaiveSelectOptions(options));
</script>

<template>
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <template #trigger>
      <NSelect
        v-model:value="colorsStore.colorScale"
        :default-value="options[1]"
        :disabled="scatterLoadingRef.value"
        :options="naiveOptions"
        placeholder="Color scale..."
        size="small"
      />
    </template>
    <span>Color scale</span>
  </NTooltip>
</template>

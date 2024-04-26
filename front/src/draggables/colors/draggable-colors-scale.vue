<script lang="ts" setup>
import {NSelect, NTooltip} from 'naive-ui';
import {colorsStore} from 'src/draggables/colors/colors-store';
import {useScatterLoading} from 'src/scatter/scatter-loading';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const options = ['Accent', 'Dark2', 'Spectral'];

const naiveOptions = computed(() => convertToNaiveSelectOptions(options));
const {isLoading} = useScatterLoading();
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
        :disabled="isLoading"
        :options="naiveOptions"
        placeholder="Color scale..."
        size="small"
      />
    </template>
    <span>Color scale</span>
  </NTooltip>
</template>

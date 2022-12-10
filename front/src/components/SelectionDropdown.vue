<script lang="ts" setup="">
import {computed, defineProps, watch} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';
import {selectionStore} from 'src/store/selection.store';

interface Props {
  bands: string[];
  intervals: string[];
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (band: string, interval: string) => void;
}

const {bands, intervals, handleUpdate} = defineProps<Props>();

const bandsOptions = computed(() => convertToNaiveSelectOptions(bands));
const intervalsOptions = computed(() => convertToNaiveSelectOptions(intervals));

function processSelection() {
  if (
    selectionStore.band === null
      || selectionStore.interval === null
  ) {
    return;
  }

  handleUpdate(selectionStore.band, selectionStore.interval);
}

watch(selectionStore, processSelection);
</script>

<template>
  <n-select
      v-model:value="selectionStore.band"
      :options="bandsOptions"
      placeholder="Bands..."
  />
  <n-select
      v-model:value="selectionStore.interval"
      :options="intervalsOptions"
      placeholder="Intervals..."
  />
</template>

<style lang="scss" scoped>
</style>

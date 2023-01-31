<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {selectionStore} from 'src/store/selection.store';
import {computed, defineProps, watch} from 'vue';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

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
      size="tiny"
  />
  <n-select
      v-model:value="selectionStore.interval"
      :options="intervalsOptions"
      placeholder="Intervals..."
      size="tiny"
  />
</template>

<style lang="scss" scoped>
</style>

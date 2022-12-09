<script lang="ts" setup="">
import {computed, defineProps, ref, watch} from 'vue';
import {NSelect} from 'naive-ui';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

interface Props {
  bands: string[];
  intervals: string[];
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (band: string, interval: string) => void;
}

const {bands, intervals, handleUpdate} = defineProps<Props>();

const bandsValue = ref();
const intervalsValue = ref();

const bandsOptions = computed(() => convertToNaiveSelectOptions(bands));
const intervalsOptions = computed(() => convertToNaiveSelectOptions(intervals));

function processSelection() {
  if (typeof bandsValue.value === 'undefined' || typeof intervalsValue.value === 'undefined') {
    return;
  }

  handleUpdate(bandsValue.value, intervalsValue.value);
}

watch([bandsValue, intervalsValue], processSelection);
</script>

<template>
  <n-select
      v-model:value="bandsValue"
      :options="bandsOptions"
      placeholder="Bands..."
  />
  <n-select
      v-model:value="intervalsValue"
      :options="intervalsOptions"
      placeholder="Intervals..."
  />
</template>

<style lang="scss" scoped>
</style>

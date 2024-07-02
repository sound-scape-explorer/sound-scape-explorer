<script lang="ts" setup="">
import {useAppCandles} from 'src/app/candles/use-app-candles';
import {watch} from 'vue';

export interface AppCandlesProps {
  exportFilename: string;
  condensed: boolean;
  timestamps: number[];
  labels: string[];
  high: number[];
  low: number[];
  open: number[];
  close: number[];
  yTitle?: string;
  title?: string;
}

const props = defineProps<AppCandlesProps>();

const {container, mount, render, data, layout, plotBackground} =
  useAppCandles(props);

render();
watch([container, data, layout], mount);
watch([props, plotBackground], render);
</script>

<template>
  <span
    ref="container"
    class="app-candles"
  />
</template>

<style lang="scss" scoped>
.app-candles {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

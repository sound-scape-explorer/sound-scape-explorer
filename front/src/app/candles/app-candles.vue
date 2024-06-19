<script lang="ts" setup="">
import {useAppCandles} from 'src/app/candles/app-candles';

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

const {container} = useAppCandles(props);
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

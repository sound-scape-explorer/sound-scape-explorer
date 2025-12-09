<script lang="ts" setup>
import {useAppCandles} from 'src/app/candles/use-app-candles';
import {onMounted, watch} from 'vue';

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
  isExpanded?: boolean;
}

const props = withDefaults(defineProps<AppCandlesProps>(), {
  isExpanded: false,
});

const {container, mount, render, data, layout, plotBackground} =
  useAppCandles(props);

onMounted(render);
watch([container, data, layout], mount);
watch(
  [
    plotBackground,
    () => props.condensed,
    () => props.isExpanded,
    () => props.low,
  ],
  render,
);
</script>

<template>
  <div ref="container" />
</template>

<script lang="ts" setup="">
import {useElementSize} from '@vueuse/core';
import {useAppHeatmap} from 'src/app/heatmap/use-app-heatmap';
import {useAppHeatmapLifecycles} from 'src/app/heatmap/use-app-heatmap-lifecycles';
import {watch} from 'vue';

export interface AppHeatmapProps {
  title?: string;
  x: string[];
  y: string[];
  values: (number | null)[][];
  colorscale: string;
  range: {min: number | undefined; max: number | undefined};
  exportName: string;
}

const props = defineProps<AppHeatmapProps>();
const {div} = useAppHeatmap();
useAppHeatmapLifecycles(props);
</script>

<template>
  <div ref="div" />
</template>
